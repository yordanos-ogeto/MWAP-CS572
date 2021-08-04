const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

module.exports.login = function (req, res) {
  console.log("controller Login");
  const credential = {
    username: req.body.usernmae,
  };

  User.findOne(credential)
    .then((user) => checkUserName(user, res))
    .then((user) => checkPass(user, req))
    .then((same) => getUser(same, res, credential))
    .catch((err) => res.status(500).json(err));
};

function checkUserName(user, res) {
  if (!user) {
    res.status(401).json({ message: "wrong credential!" });
    return;
  }
  return user;
}

function checkPass(user, req) {
  return bcrypt.compare(req.body.password, user.password);
}
function getUser(same, res, credential) {
  const response = {
    status: 200,
  };
  if (same) {
    console.log("user authenticated");
    response.message = jwt.sign(
      { payload: credential.username },
      process.env.PASS_PHRASE,
      { expiresIn: 3600 }
    );
  } else {
    response.status = 401;
    response.message = { message: "Wrong credentials" };
  }
  console.log("sending ", response.message);
  res.status(response.status).json(response.message);
}

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
  bcrypt
    .genSalt(10)
    .then((salt) => hashPassword(salt, req))
    .then((hashPassword) => registerUser(hashPassword, req))
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
};

function hashPassword(salt, req) {
  return bcrypt.hash(req.body.password, salt);
}
function registerUser(hashedPassword, req) {
  const newUser = {
    username: req.body.username,
    password: hashedPassword,
    name: req.body.name,
  };
  return User.create(newUser);
}
