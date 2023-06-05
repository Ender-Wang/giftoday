const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserDB = require("./schemas/User.js");
// const dummyUserData = require("./dummyUserData.js");
const app = express();

//allow cross origin requests
app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/testUserDB2")
  .then(() => {
    console.log("Connected to DB");
    run();
  })
  .catch((err) => {
    console.log(err);
  });

async function run() {
  try {
    await UserDB.deleteMany(); // Remove existing users before adding new ones
    // console.log(dummyUserData);
    // const createdUsers = await UserDB.create(dummyUserData);
    // console.log("Users created:", createdUsers);
  } catch (error) {
    console.log("Error creating users:", error);
  }
}

//Demo: get all info from all users
app.get("/users", (req, res) => {
  UserDB.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get APIs
// TODO: Get user General info: [id, name, email, password, premium]
app.get("/user/:userID/info", (req, res) => {
  const { userID } = req.params;

  UserDB.findOne({ id: userID }) // Find the user by ID
    .then((user) => {
      if (user) {
        res.json([user]); // Wrap user in an array
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//TODO: Get user Card info with user id: [id, number, cvv, expMonth, expYear]
app.get("/user/:userID/card", (req, res) => {});

//TODO: Get user Message info with user id: [id, message, date]
app.get("/user/:userID/message", (req, res) => {});

//TODO: Get user Cart info with user id: id, gift: [id, name, description, price, tag: [id, name]]
app.get("/user/:userID/cart", (req, res) => {});

//TODO: Get user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
app.get("/user/:userID/order", (req, res) => {});

//TODO: Get user Address info with user id: [id, fullName, postalCode, street, city, country]
app.get("/user/:userID/address", (req, res) => {});

//Post APIs
//Registration
app.post("/user/registration", (req, res) => {
  const { email } = req.body;

  UserDB.findOne({ email }) // Check if email already exists in the database
    .then((existingUser) => {
      if (existingUser) {
        // If email exists, send a response indicating that the email is already registered
        return res.status(409).json({ error: "Email already registered" });
      }

      // Generate a new user ID
      UserDB.countDocuments().then((count) => {
        let userID = count + 1;
        req.body.id = userID;

        var { id, name, password, address } = req.body;
        var newUser = new UserDB({
          id,
          name,
          email,
          password,
          address,
        });

        newUser
          .save()
          .then((user) => {
            console.log("Registration successful with user: ", user);
            return res.json(user);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

//Login
app.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  UserDB.findOne({ email }) // Find the user by email
    .then((user) => {
      if (!user) {
        // If user is not found, send a response indicating that the email is not registered
        return res.status(404).json({ error: "Email not found!" });
      }

      if (user.password !== password) {
        // If password is incorrect, send a response indicating that the password is wrong
        return res.status(401).json({ error: "Wrong password!" });
      }

      // Authentication successful
      console.log("Login successful for user: ", user);
      const response = {
        userID: user.id,
      };
      console.log("User Id from the backend: ", response.userID);
      return res.json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/user/:userID/premium", async (req, res) => {
  const { userID } = req.params;
  const { premium } = req.body;

  try {
    const user = await UserDB.findOneAndUpdate(
      { id: userID },
      { premium },
      { new: true }
    );

    if (user) {
      if (premium) {
        console.log(`User ${userID} upgraded to premium. Premium: ${premium}`);
        res.status(200).json({ message: "Premium upgrade successful.", user });
      } else {
        console.log(
          `User ${userID} downgraded from premium. Premium: ${premium}`
        );
        res.status(200).json({ message: "Do not subscribe to premium.", user });
      }
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating user premium status.",
      });
  }
});

//TODO: Post user Card info with user id: [id, number, cvv, expMonth, expYear]
app.post("/user/:userID/card", (req, res) => {});

//TODO: Post user Message info with user id: [id, message, date]
app.post("/user/:userID/message", (req, res) => {});

//TODO: Post user Cart info with user id: id, gift: [id, name, description, price, tag: [id, name]]
app.post("/user/:userID/cart", (req, res) => {});

//TODO: Post user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
app.post("/user/:userID/order", (req, res) => {});

//TODO: Post user Address info with user id: [id, fullName, postalCode, street, city, country]
app.post("/user/:userID/address", (req, res) => {});

//Delete API
//TODO: Delete APIs

//Expose API to port 4000
const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});
