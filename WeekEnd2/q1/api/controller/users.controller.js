const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

module.exports.login = function (req, res) {
  const credential = {
    username: req.body.username,
  };

  User.findOne(credential, function (err, doc) {
    const response = {
      status: 200,
      message: doc,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!doc) {
      response.status = 400;
      response.message = { message: "wrong creds!" };
    }
    if (response.status !== 200) {
      res.status(response.status).json(response.message);
      return;
    }

    console.log("user found", doc.username, doc.password);

    bcrypt.compare(req.body.password, doc.password, function (err, same) {
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
          { payload: doc.username },
          process.env.PASS_PHRASE,
          { expiresIn: 3600 }
        );
      } else {
        response.status = 401;
        response.message = { message: "Wrong credentials" };
      }
      console.log("sending ", response.message);
      res.status(response.status).json(response.message);
    });
  });
};

module.exports.authenticate = function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(400).json({ message: "token missing" });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.PASS_PHRASE, function (err, decoded) {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  }
};

module.exports.register = function (req, res) {
  bcrypt.genSalt(10, function (err, generatedSalt) {
    bcrypt.hash(
      req.body.password,
      generatedSalt,
      function (err, hashedPassword) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "error generating password" });
          return;
        }

        const newUser = {};

        newUser.username = req.body.username;
        newUser.password = hashedPassword;
        newUser.name = req.body.name;

        User.create(newUser, function (err, doc) {
          const response = {
            status: 201,
            message: doc,
          };

          if (err) {
            response.status = 500;
            response.message = err;
          }

          res.status(response.status).json(response.message);
        });
      }
    );
  });
};
