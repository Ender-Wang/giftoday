const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserDB = require("./schemas/User.js");
// const dummyUserData = require("./dummyUserData.js");
const ShopItemDB = require("./schemas/ShopItem.js");
// const {
//   default: ShopItem,
// } = require("../frontend/src/components/ShopItem.jsx");
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
async function run() {
  try {
    // await ShopItemDB.deleteMany(); // Remove existing users before adding new ones
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

//Get shopItem general into: [id, name, description, price, tag]
app.get("/shopItems", async (req, res) => {
  try {
    const shopItems = await ShopItemDB.find();
    res.json(shopItems);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal server error" });
  }
});

//TODO: Get user General into: [id, name, email, password, premium]
app.get("/user/:userID/info", (req, res) => {});

//TODO: Get user Card info with user id: [id, number, cvv, expMonth, expYear]
app.get("/user/:userID/card", (req, res) => {});

//TODO: Get user Message info with user id: [id, message, date]
app.get("/user/:userID/message", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const user = await UserDB.findOne({ id });
    const message = user.message;
    console.log("message " + message);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
});

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

//Post shopItem with shop id: [id, name, description, price, tag]
app.post("/shopItems", (req, res) => {
  ShopItemDB.countDocuments()
    .then((count) => {
      let shopItemID = count + 1;
      req.body.id = shopItemID;
      var { id, name, stock, picture, description, price, tag } = req.body;
      const newShopItem = new ShopItemDB({
        id,
        name,
        stock,
        picture,
        description,
        price,
        tag,
      });

      newShopItem
        .save()
        .then((item) => {
          console.log("Successful with item: ", item);
          const { _id, __v, ...responseItem } = item._doc; // Exclude _id and __v fields
          return res.json(item);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});
// });

//TODO: Post user Card info with user id: [id, number, cvv, expMonth, expYear]
app.post("/user/:userID/card", (req, res) => {});
//
//TODO: Post user Message info with user id: [id, message, date]
app.put("/user/:userID/message", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const { message } = req.body;
    console.log("message " + message);
    console.log("userID " + id);
    if (!message) {
      throw new Error("Invalid message value");
    }
    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id });

    if (!user) {
      throw new Error("User not found");
    }

    const newMessage = {
      id: user.message.length + 1,
      message: message,
      date: new Date(),
      tag: { id: 1, name: "message Tag" },
    };

    // Update the user data with the new message
    user.message.push(newMessage);
    await user.save();

    return res.status(200).json({
      message: message,
      id: id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// app.delete("/usesr/:userID/message", async (req, res)=>{
//   try{
//     const { userID } = req.params;
//     let id = Number(userID);
//     const user = await UserDB.findOne({ id });
// }catch(error) {
//   return res.status(200).json({ message: error.message });

// }})

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
