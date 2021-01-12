const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//users
app.use(userRouter);

//tasks
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});

const task = require("./models/task");
const user = require("./models/user");

const main = async () => {
  let findUser = await user.findById("5ffbe72fdc008b14e44b2cd3");
  // let findTask = await task.findById("5ffcb4465446d91dabb8ce01");
  // await findTask.populate("user").execPopulate();
  // console.log(findTask.user);
  await findUser.populate("userTask").execPopulate();
  console.log(findUser.userTask);
};

main();
