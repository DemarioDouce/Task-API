// CRUD
//global variables
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "taskApp";

const id = new objectId();
console.log(id.id);
console.log(id.getTimestamp());

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
  }
);
