const express = require("express");
require("dotenv").config();
const game = require("./games.json");
const app = express();

app.get("/json", function (req, res) {
  console.log("JSON request received");
  res.status(200).json(game);
});
const server = app.listen(process.env.PORT, function () {
  const port = server.address().port;
  console.log("Listing to port : " + port);
});
