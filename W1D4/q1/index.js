const express = require("express");
require("dotenv").config();
require("./api/data/db");
const path = require("path");

const router = require("./api/router");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  console.log((req.method, req.url));
  next();
});
app.use("/api", router);
const server = app.listen(process.env.PORT, function () {
  console.log("listening to port : " + server.address().port);
});
