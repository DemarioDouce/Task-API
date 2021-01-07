const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.send("GET request are disable.");
  } else {
    next();
  }
});

app.use(express.json());

//users
app.use(userRouter);

//tasks
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
