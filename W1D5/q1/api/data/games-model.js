const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  location: {
    type: {
      type: String,
    },
    coordinate: {
      type: [Number],
      index: "2dsphere",
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
  reviews: [reviewSchema],
});
mongoose.model("Game", gameSchema, "games");
