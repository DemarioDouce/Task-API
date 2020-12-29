//npm module
const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw console.log("Email is invalid");
      }
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value == "password") {
        throw console.log("Your password should not be password.");
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < -1) {
        throw new Error("Age must be a positive number.");
      }
    },
  },
});

module.exports = User;
