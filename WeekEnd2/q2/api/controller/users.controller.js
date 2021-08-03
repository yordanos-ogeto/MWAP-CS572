const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

module.exports.login = function (req, res) {
  console.log("controller Login");
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).exec(function (err, user) {
    if (err) {
      res.status(500).json(err);
    }

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.log("Err", err);
          res.status(400).json({ message: "unauthorized" });
        } else {
          if (result) {
            console.log("User found", user);
            const token = jwt.sign({ name: user.name }, "cs572", {
              expiresIn: 3600,
            });
            res.status(200).json({ success: "true", token: token });
          }
        }
      });
    } else {
      res.status(400).json({ message: "unauthorized" });
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  const headerExists = req.headers.authorization;
  if (!headerExists) {
    res.status(400).json({ message: "token missing" });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.PASS_PHRASE, function (err, decoded) {
      if (err) {
        console.log("jwt verify error", err);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  }
};

module.exports.register = function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    // console.log("register user");
    bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "error generating password" });
        return;
      }
      const newUser = {
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
      };

      User.create(newUser, function (err, user) {
        if (err) {
          console.log("error reated user ", err);
          res.status(500).json({ message: err });
        } else {
          console.log("user created");
          res.status(201).json(user);
        }
      });
    });
  });
};
