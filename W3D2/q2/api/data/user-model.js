const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
});
mongoose.model("User", userSchema, "users");
