const express = require("express");
require("./db/mongoose");
const user = require("./models/user");
const task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//users

app.get("/users", async (req, res) => {
  try {
    const findUsers = await user.find({});
    res.send(findUsers);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  let userId = req.params.id;

  try {
    const findUserById = await user.findById(userId);
    if (!findUserById) {
      res.sendStatus(404).send();
    } else {
      res.send(findUserById);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/users", async (req, res) => {
  let newUser = new user(req.body);

  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/users/:id", async (req, res) => {
  let userId = req.params.id;
  let updates = Object.keys(req.body);
  let allowedUpdate = ["name", "email", "password", "age"];
  let isValidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid update." });
  }

  try {
    const findUser = await user.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!findUser) {
      res.status(400).send();
    } else {
      res.send(findUser);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/users/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    let findUser = await user.findByIdAndDelete(userId);
    if (!findUser) {
      res.status(400).send();
    } else {
      res.send(findUser);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//tasks
app.get("/tasks", async (req, res) => {
  try {
    let findTasks = await task.find({});
    res.send(findTasks);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
  let taskId = req.params.id;

  try {
    const findTaskById = await task.findById(taskId);
    if (!findTaskById) {
      res.sendStatus(404).send();
    } else {
      res.send(findTaskById);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/tasks", async (req, res) => {
  let newTask = new task(req.body);
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  let taskId = req.params.id;
  let updates = Object.keys(req.body);
  let allowedUpdate = ["description", "completed"];
  let isValidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid update." });
  }

  try {
    const findTask = await task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!findTask) {
      res.status(400).send();
    } else {
      res.send(findTask);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  let taskId = req.params.id;
  try {
    let findTask = await task.findByIdAndDelete(taskId);
    if (!findTask) {
      res.status(400).send();
    } else {
      res.send(findTask);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
