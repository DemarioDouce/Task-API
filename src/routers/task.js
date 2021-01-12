const express = require("express");
const task = require("../models/task");
const auth = require("../middleware/auth");
require("../db/mongoose");
const router = new express.Router();

router.get("/tasks", async (req, res) => {
  try {
    let findTasks = await task.find({});
    res.send(findTasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
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

router.post("/new/task", auth, async (req, res) => {
  //let newTask = new task(req.body);
  let newTask = new task({ ...req.body, user: req.tokenUser._id });
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/tasks/:id", async (req, res) => {
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
    let findTask = await user.findById(taskId);

    updates.forEach((update) => {
      findTask[update] = req.body[update];
    });

    await findTask.save();

    if (!findTask) {
      res.status(400).send();
    } else {
      res.send(findTask);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
