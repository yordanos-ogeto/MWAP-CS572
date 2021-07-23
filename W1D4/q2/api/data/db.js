const mongoose = require("mongoose");
require("dotenv").config();
require("./student-model.js");
const dbURLAndName = process.env.DB_URL + process.env.DB_NAME;
console.log("enviroment" + dbURLAndName);
mongoose.connect(dbURLAndName);

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error " + err);
});
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
  });
});
process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
  });
});

process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  });
});
