const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserDB = require("./schemas/User.js");
const ShopItemDB = require("./schemas/ShopItem.js");

//import ShopData from "./ShopData.json";
const shopItems = require("./ShopData.json");

const app = express();

//allow cross origin requests
app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/testUserDB2")
  .then(() => {
    console.log("Connected to DB");
    run();
    populateShopItemDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function run() {
  try {
    // await UserDB.deleteMany(); // Remove existing users before adding new ones
    // await ShopItemDB.deleteMany(); // Remove existing ShopItems before adding new ones
    // console.log(dummyUserData);
    // const createdUsers = await UserDB.create(dummyUserData);
    // console.log("Users created:", createdUsers);
  } catch (error) {
    console.log("Error creating users:", error);
  }
}

//Populate ShopItemDB with ShopData.json
async function populateShopItemDB() {
  try {
    const count = await ShopItemDB.countDocuments();
    if (count > 0) {
      // await ShopItemDB.deleteMany();
      console.log("ShopItemDB already populated");
    } else {
      for (const item in shopItems) {
        const shopItem = new ShopItemDB({
          id: shopItems[item].id,
          name: shopItems[item].name,
          image: shopItems[item].image,
          stock: shopItems[item].stock,
          description: shopItems[item].description,
          price: shopItems[item].price,
          tag: shopItems[item].tag,
        });
        await shopItem.save();
      }
      console.log("ShopItemDB populated with " + shopItems.length + " items");
    }
  } catch (error) {
    console.log("Error populating ShopItemDB:", error);
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

//<---------------------- GET ---------------------->

//Get all shopItems
app.get("/shopItems", async (req, res) => {
  try {
    const shopItems = await ShopItemDB.find();
    res.json(shopItems);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal server error" });
  }
});

//Get shopItem by id
app.get("/shopItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shopItem = await ShopItemDB.findOne({ id });
    res.json(shopItem);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: "ShopItem not found" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get user General info: [id, name, email, password, premium]
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

//Get user Message info with user id: [id, message, date]
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

//Get user Cart info with user id
app.get("/user/:userID/cart", async (req, res) => {
  try {
    const { userID } = req.params;
    const uid = Number(userID);
    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      throw new Error("User not found");
    }
    // Return the user's cart
    return res.status(200).json({
      cart: user.cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//TODO: Get user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
app.get("/user/:userID/order", (req, res) => {});

//TODO: Get user Address info with user id: [id, fullName, postalCode, street, city, country]
app.get("/user/:userID/address", (req, res) => {});

//<---------------------- POST ---------------------->
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

//<---------------------- PUT ---------------------->
//Set premium status
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
    res.status(500).json({
      message: "An error occurred while updating user premium status.",
    });
  }
});

//TODO: Post user Card info with user id: [id, number, cvv, expMonth, expYear]
app.put("/user/:userID/card", (req, res) => {});

//Add user Message info with user id: [id, message, date]
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

//Add Gift to user Cart
app.put("/user/:userID/cart", async (req, res) => {
  try {
    const { userID } = req.params;
    const uid = Number(userID);
    const { id, name, description, price, quantity, tag } = req.body;
    console.log("UserID: " + uid);
    if (!name) {
      throw new Error("Invalid gift value");
    }

    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the gift already exists in the cart
    const existingGiftIndex = user.cart.findIndex((gift) => gift.id === id);
    if (existingGiftIndex !== -1) {
      // If the gift already exists, increase the quantity by one
      user.cart[existingGiftIndex].quantity += 1;
    } else {
      // If the gift doesn't exist, add it as a new gift to the cart
      const newGift = {
        id: id,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        tag: tag,
      };
      user.cart.push(newGift);
    }

    // TODO: Reduce Gift stock by 1 if the gift is added to the cart

    // Update the user data with the modified cart
    await user.save();
    return res.status(200).json({
      message: "Gift added to cart of user with userID " + uid,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//TODO: Post user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
app.put("/user/:userID/order", (req, res) => {});

//TODO: Post user Address info with user id: [id, fullName, postalCode, street, city, country]
app.put("/user/:userID/address", (req, res) => {});

//Update the profile information of customer
app.put("/user/userInfo", async (req, res) => {
  try {
    const { id, name, email, password, address } = req.body;

    const updatedUser = await UserDB.findOneAndUpdate(
      { id },
      { name, email, password, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Not found user" });
    }

    console.log("User Information has been updated：", updatedUser);
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Errors in the server" });
  }
});

//<---------------------- DELETE ---------------------->
//Delete user message
// app.delete("/usesr/:userID/message", async (req, res)=>{
//   try{
//     const { userID } = req.params;
//     let id = Number(userID);
//     const user = await UserDB.findOne({ id });
// }catch(error) {
//   return res.status(200).json({ message: error.message });

// }})

//Expose API to port 4000
const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});
