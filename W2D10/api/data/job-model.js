const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  address: String,
  coordinate: {
    type: Number,
    index: "2dsphare",
  },
});
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  salary: Number,
  description: String,
  experience: String,
  postDate: Date,
  skill: [String],
  location: locationSchema,
});

mongoose.model("job", jobSchema, "jobs");
