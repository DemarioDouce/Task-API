const task = require("../src/models/task");
const user = require("../src/models/user");

const main = async () => {
  let findUser = await user.findById("5ffbe72fdc008b14e44b2cd3");
  // let findTask = await task.findById("5ffcb4465446d91dabb8ce01");
  // await findTask.populate("user").execPopulate();
  // console.log(findTask.user);
  await findUser.populate("userTask").execPopulate();
  console.log(findUser.userTask);
};

main();
