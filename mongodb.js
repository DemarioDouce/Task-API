// CRUD
//global variables
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "taskApp";

// const id = new objectId();
// console.log(id.id);
// console.log(id.getTimestamp());

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database.");
    }

    //database ref
    const db = client.db(databaseName);

    // //insert one doc
    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Poolio",
    //     age: 20,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    //insert many doc
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 26,
    //     },
    //     { name: "Blake", age: 25 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert docs");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     { description: "Code more", completed: true },
    //     { description: "Push to github", completed: true },
    //     { description: "Graduate in 2099", completed: false },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert docs");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    //fetch data

    // db.collection("users").findOne(
    //   { _id: new objectId("5fe70cb1312c8605c800cc70") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 20 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 20 })
    //   .count((error, users) => {
    //     console.log(users);
    //   });

    db.collection("tasks").findOne(
      {
        _id: new objectId("5fe7fd22411b1714ffd2a265"),
      },
      (error, tasks) => {
        if (error) {
          console.log(error);
        } else {
          console.log(tasks);
        }
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          console.log(error);
        } else {
          console.log(tasks);
        }
      });
  }
);