require("../src/db/mongoose");
const task = require("../src/models/task");

//

// task
//   .findByIdAndDelete({ _id: "5fea53c920080716717e6c29" })
//   .then((foundTask) => {
//     console.log(foundTask);
//     return task.countDocuments({ completed: true });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const findAndDelet = async (id) => {
  const foundTask = await task.findByIdAndDelete(id);
  const count = await task.countDocuments(id);
  return count;
};

findAndDelet("5feabfd009abb02cb0e7e2ec")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
