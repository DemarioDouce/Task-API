const express = require("express");
const user = require("../models/user");
require("../db/mongoose");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/users/me", auth, async (req, res) => {
  res.send(req.tokenUser);
});

router.get("/users/:id", async (req, res) => {
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

router.post("/users", async (req, res) => {
  let newUser = new user(req.body);
  let token = await newUser.genAuthToken();

  try {
    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    let userLogin = await user.findByCre(req.body.email, req.body.password);
    let token = await userLogin.genAuthToken();
    res.send({ userLogin, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.tokenUser.tokens = req.tokenUser.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.tokenUser.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logout/all", auth, async (req, res) => {
  try {
    req.tokenUser.tokens = [];
    await req.tokenUser.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
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
    // const findUser = await user.findByIdAndUpdate(userId, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    let findUser = await user.findById(userId);

    updates.forEach((update) => {
      findUser[update] = req.body[update];
    });

    await findUser.save();

    if (!findUser) {
      res.status(400).send();
    } else {
      res.send(findUser);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
