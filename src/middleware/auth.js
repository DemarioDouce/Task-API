const jwt = require("jsonwebtoken");
const user = require("../models/user");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").replace("Bearer ", "");
    //!dirty fix
    let decoded = jwt.decode(token, "secret");
    //!
    let tokenUser = await user.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!tokenUser) {
      throw new Error();
    }

    req.token = token;
    req.tokenUser = tokenUser;

    next();
  } catch (e) {
    res.status(401).send({ Error: "Please authenticate." });
  }
};

module.exports = auth;
