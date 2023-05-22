//Test server js file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./TestUser.js");
const app = express();

//allow cross origin requests
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => {
    console.log("Connected to DB");
    run();
  })
  .catch((err) => {
    console.log(err);
  });

async function run() {
  const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
  ];

  try {
    await User.deleteMany(); // Remove existing users before adding new ones
    const createdUsers = await User.create(users);
    console.log("Users created:", createdUsers);
  } catch (error) {
    console.log("Error creating users:", error);
  }
}

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Backend API runs on port 4000
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
