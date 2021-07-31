const express = require("express");
require("dotenv").config();
require("./api/data/db");
const router = require("./api/route");
const path = require("path");
const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use("/api", router);
const server = app.listen(process.env.PORT, function () {
  console.log("Listing to port" + server.address().port);
});
