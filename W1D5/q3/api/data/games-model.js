const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  review: {
    type: String,
  },
});
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country: {
    type: String,
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
  publisher: { type: publisherSchema, default: {} },
  reviews: [reviewSchema],
});
mongoose.model("Game", gameSchema, "games");
