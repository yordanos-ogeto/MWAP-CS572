const mongoose = require("mongoose");
require("./job-model");
mongoose.connect(process.env.DATABASE_URL + process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Send disconnect to mongoose because of application termination"
    );
    process.exit(0);
  });
});
process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log(
      "Send disconnect to mongoose because of application termination"
    );
    process.exit(0);
  });
});

process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Send disconnect to mongoose because of application restart");
    process.kill(process.pid, "SIGUSER2");
  });
});
