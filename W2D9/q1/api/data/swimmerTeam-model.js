const mongoose = require("mongoose");
const swimmerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: Number,
  gender: String,
});
const swimmerTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  score: Number,
  year: Number,
  rank: Number,
  swimmer: [swimmerSchema],
});
mongoose.model("Swimmer", swimmerTeamSchema, "information");
