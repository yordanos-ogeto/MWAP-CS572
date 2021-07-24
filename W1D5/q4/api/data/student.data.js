const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  id: {
    type: Number,
    require: true,
  },
});
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  grade: {
    type: Number,
    min: 2,
    max: 4,
  },
  courses: [courseSchema],
});
mongoose.model("Student", studentSchema, "student");
