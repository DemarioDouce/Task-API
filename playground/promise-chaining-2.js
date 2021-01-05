require("../src/db/mongoose");
const task = require("../src/models/task");

//

task
  .findByIdAndDelete({ _id: "5fea53c920080716717e6c29" })
  .then((foundTask) => {
    console.log(foundTask);
    return task.countDocuments({ completed: true });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
