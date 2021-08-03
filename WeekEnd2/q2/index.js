const express = require("express");
const path = require("path");
require("dotenv").config();
require("./api/data/db");
const router = require("./api/router");

const app = express();

app.use(function (req, res, next) {
  console.log((req.method, req.url));
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
const server = app.listen(process.env.PORT, function () {
  console.log("listening to port : " + server.address().port);
});
