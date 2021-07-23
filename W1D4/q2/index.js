const express = require("express");
require("./api/data/db");
const router = require("./api/router");

require("dotenv").config();

const app = express();

app.use("/api", router);
const server = app.listen(process.env.PORT, function () {
  console.log("listening to port : " + server.address().port);
});
