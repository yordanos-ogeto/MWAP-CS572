const mongoose = require('mongoose');

require('./student.data');

mongoose.connect(process.env.CONN_URL + process.env.DB_NAME);

mongoose.connection.on('connected', function() { console.log("connected with the database") });

mongoose.connection.on('disconnected', function() { console.log("disconnected with the database") });

mongoose.connection.on('error', function() { console.log("error occured with the database") });

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("closed connection");
        process.exit(0);
    });
});