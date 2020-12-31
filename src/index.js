const express = require("express");
require("./db/mongoose");
const user = require("./models/user");
const task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

//users

app.get("/users", (req, res) => {
  user
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.sendStatus(500).send(error);
    });
});

app.get("/users/:id", (req, res) => {
  let userId = req.params.id;

  user
    .findById(userId)
    .then((users) => {
      if (!users) {
        res.sendStatus(404).send();
      } else {
        res.send(users);
      }
    })
    .catch((error) => {
      res.sendStatus(500).send(error);
    });
});

app.post("/users", (req, res) => {
  let newUser = new user(req.body);
  newUser
    .save()
    .then(() => {
      res.sendStatus(201).send(newUser);
    })
    .catch((error) => {
      res.sendStatus(400).send(error);
    });
});

//tasks
app.post("/tasks", (req, res) => {
  let newTask = new task(req.body);
  newTask
    .save()
    .then(() => {
      res.sendStatus(201).send(newTask);
    })
    .catch((error) => {
      res.sendStatus(400).send(error);
    });
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
