const express = require("express");
require("dotenv").config();
const path = require("path");

const router = require("./api/router");
const connection = require("./api/data/dbconnection");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

connection.open();
app.use(function (req, res, next) {
  console.log((req.method, req.url));
  next();
});
app.use("/api", router);
const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port : " + server.address().port);
});
