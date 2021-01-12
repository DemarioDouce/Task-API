const express = require("express");
const task = require("../models/task");
const auth = require("../middleware/auth");
require("../db/mongoose");
const router = new express.Router();

// /task/all?completed=true
// /task/all?limit=10&skip=10
router.get("/task/all", auth, async (req, res) => {
  let match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  try {
    await req.tokenUser
      .populate({
        path: "userTask",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
        },
      })
      .execPopulate();
    res.send(req.tokenUser.userTask);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/task/:id", auth, async (req, res) => {
  let _id = req.params.id;

  try {
    //let findTaskById = await task.findById(taskId);
    let findTaskById = await task.findOne({ _id, user: req.tokenUser._id });
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

router.patch("/update/task/:id", auth, async (req, res) => {
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
    let findTask = await task.findOne({ _id: taskId, user: req.tokenUser._id });

    if (!findTask) {
      res.status(400).send();
    } else {
      updates.forEach((update) => {
        findTask[update] = req.body[update];
      });
      await findTask.save();
      res.send(findTask);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/delete/task/:id", auth, async (req, res) => {
  let taskId = req.params.id;
  try {
    let findTask = await task.findOneAndDelete({
      _id: taskId,
      user: req.tokenUser._id,
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

module.exports = router;
