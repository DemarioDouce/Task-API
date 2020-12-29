//npm module
const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/TaskAppAPI", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

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

// const newUser = new User({
//   name: "Demario",
//   email: "ddouce@gmail.com",
//   password: "1234567",
//   age: 22,
// })
//   .save()
//   .then(() => {
//     console.log(newUser);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Task", {
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean },
});

const newTask = new Task({ description: "Fix my computer", completed: false })
  .save()
  .then(() => {
    console.log(newTask);
  })
  .catch((error) => {
    console.log(error);
  });
