//npm module
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/TaskAppAPI", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: { type: String },
  age: { type: Number },
});

// const me = new User({ name: "Demario", age: 22 })
//   .save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Task", {
  description: { type: String },
  completed: { type: Boolean },
});

const newTask = new Task({ description: "Fix weather bug", completed: false })
  .save()
  .then(() => {
    console.log(newTask);
  })
  .catch((error) => {
    console.log(error);
  });
