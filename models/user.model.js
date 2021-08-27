const mongoose = require("mongoose");

const userDetail = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNum: {
    type: Number,
  },
  about: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("user", userDetail);

module.exports = User;
