const express = require("express");
require("./db/mongoose");
const user = require("./models/user");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  let newUser = new user(req.body);
  newUser
    .save()
    .then(() => {
      res.send(newUser);
    })
    .catch((error) => {
      res.sendStatus(400).send(error);
    });
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port + ".");
});
