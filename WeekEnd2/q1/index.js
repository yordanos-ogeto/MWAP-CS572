const express = require("express");
require("dotenv").config();
require("./api/data/db");
const path = require("path");
const router = require("./api/router");

const app = express();

app.use(function (req, res, next) {
  console.log((req.method, req.url));
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
const server = app.listen(process.env.PORT, function () {
  console.log("listening to port : " + server.address().port);
});
