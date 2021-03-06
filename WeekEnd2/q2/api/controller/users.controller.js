const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

module.exports.login = function (req, res) {
  console.log("controller Login");
  const credential = {
    username: req.body.usernmae,
  };

  User.findOne(credential, function (err, user) {
    const response = {
      status: 200,
      message: user,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!user) {
      response.status = 400;
      response.message = { message: "wrong credential" };
    }
    if (response.status !== 200) {
      res.status(response.status).json(response.message);
      return;
    }
    bcrypt.compare(req.body.password, user.password, function (err, same) {
      const response = {
        status: 200,
        message: "",
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      if (same) {
        console.log("user authenticated");
        response.message = jwt.sign(
          { payload: user.username },
          process.env.PASS_PHRASE,
          { expiresIn: 3600 }
        );
      } else {
        response.status = 401;
        response.message = { message: "wrong credentials" };
      }
      console.log("sending", response.message);
      res.status(response.status).json(response.message);
    });
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
