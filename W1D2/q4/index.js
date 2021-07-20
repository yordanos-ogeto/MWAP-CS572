const express = require("express");
require("dotenv").config();
const app = express();

app.get("/:number1", function (req, res) {
  const num1 = req.params.number1;
  const num2 = req.query.number2;
  const sum = parseInt(num1) + parseInt(num2);
  res.send(sum.toString());
});
const server = app.listen(process.env.PORT, function () {
  const port = server.address().port;
  console.log("Listing to port : " + port);
});
