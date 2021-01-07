//npm module
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.genAuthToken = async function () {
  let userToken = this;
  let token = jwt.sign(
    { _id: userToken._id.toString() },
    "secret secret do not tell"
  );

  userToken.tokens = userToken.tokens.concat({ token });
  await userToken.save();

  return token;
};

userSchema.statics.findByCre = async (email, password) => {
  let userFind = await User.findOne({ email });

  if (!userFind) {
    throw new Error("Unable to login.");
  }

  let isMatch = await bcrypt.compare(password, userFind.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return userFind;
};
//hash the plain text password before saving
userSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
