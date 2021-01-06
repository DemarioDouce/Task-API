require("../src/db/mongoose");
const user = require("../src/models/user");

//

// user
//   .findByIdAndUpdate("5feb813f382d4a240ae68a40", { age: 23 })
//   .then((foundUser) => {
//     console.log(foundUser);
//     return user.countDocuments({ age: 23 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const foundUser = await user.findByIdAndUpdate(id, { age: age });
  const count = await user.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("5feb813f382d4a240ae68a40", 25)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
