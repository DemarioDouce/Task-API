require("../src/db/mongoose");
const user = require("../src/models/user");

//

user
  .findByIdAndUpdate("5feb813f382d4a240ae68a40", { age: 23 })
  .then((foundUser) => {
    console.log(foundUser);
    return user.countDocuments({ age: 23 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
