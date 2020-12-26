// CRUD
//global variables
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "taskApp";

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database.");
    }

    //database ref
    const db = client.db(databaseName);

    //insert doc
    db.collection("users").insertOne({
      name: "Demario",
      age: 22,
    });
  }
);
