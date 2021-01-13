const express = require("express");
const user = require("../models/user");
require("../db/mongoose");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

router.get("/user/me", auth, async (req, res) => {
  res.send(req.tokenUser);
});

router.post("/new/user", async (req, res) => {
  let newUser = new user(req.body);
  let token = await newUser.genAuthToken();

  try {
    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    let userLogin = await user.findByCre(req.body.email, req.body.password);
    let token = await userLogin.genAuthToken();
    res.send({ userLogin, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/user/logout", auth, async (req, res) => {
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

router.post("/user/logout/all", auth, async (req, res) => {
  try {
    req.tokenUser.tokens = [];
    await req.tokenUser.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/user/me/update", auth, async (req, res) => {
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

router.delete("/user/me/delete", auth, async (req, res) => {
  try {
    await req.tokenUser.remove();
    res.send(req.tokenUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//upload image
const avatars = multer({
  //5MB
  limits: { fieldSize: 5000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image."));
    } else {
      cb(undefined, true);
    }
  },
});

router.post(
  "/user/avatar/upload",
  auth,
  avatars.single("avatars"),
  async (req, res) => {
    req.tokenUser.avatar = req.file.buffer;
    await req.tokenUser.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send(error.message);
  }
);

router.delete(
  "/user/avatar/delete",
  auth,
  avatars.single("avatars"),
  async (req, res) => {
    req.tokenUser.avatar = undefined;
    await req.tokenUser.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send(error.message);
  }
);

router.get("/user/:id/avatar", async (req, res) => {
  try {
    let userId = await user.findById(req.params.id);

    if (!userId || !userId.avatar) {
      throw new Error();
    } else {
      res.set("Content-Type", "image/jpg");
      res.send(userId.avatar);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
