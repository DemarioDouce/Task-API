const express = require("express");
const user = require("../models/user");
require("../db/mongoose");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/users/me", auth, async (req, res) => {
  res.send(req.tokenUser);
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

router.patch("/users/me/update", auth, async (req, res) => {
  let updates = Object.keys(req.body);
  let allowedUpdate = ["name", "email", "password", "age"];
  let isValidOperation = updates.every((update) => {
    return allowedUpdate.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid update." });
  }

  try {
    updates.forEach((update) => {
      req.tokenUser[update] = req.body[update];
    });

    await req.tokenUser.save();

    res.send(req.tokenUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me/delete", auth, async (req, res) => {
  try {
    await req.tokenUser.remove();
    res.send(req.tokenUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
