const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    address: String,
    coordinate: {
      type: [Number],
      index: "2dshere",
    },
  },
});
const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: Number,
  minPlayer: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayer: {
    type: Number,
    min: 1,
    max: 10,
  },
  minAge: Number,
  designer: [String],
  publisher: publisherSchema,
});
mongoose.model("Game", gameSchema, "games");
