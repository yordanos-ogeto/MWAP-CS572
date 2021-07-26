const mongoose = require("mongoose");
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
});
mongoose.model("Student", studentSchema, "student");
