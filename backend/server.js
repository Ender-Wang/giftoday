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
    // await ShopItemDB.deleteMany(); //Dump all existing ShopItems
    if (count > 0) {
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

// Shop Item Routes
const shopItemsRouter = require("./routes/shopItems.js");
app.use(shopItemsRouter);

// User Registration Routes
const registrationRouter = require("./routes/registration.js");
app.use(registrationRouter);

// User Login Routes
const loginRouter = require("./routes/login.js");
app.use(loginRouter);

// User Routes
const userRouter = require("./routes/user.js");
app.use(userRouter);

// User Info Routes
const userInfoRouter = require("./routes/userInfo.js");
app.use(userInfoRouter);

// User Premium Routes
const premiumRouter = require("./routes/premium.js");
app.use(premiumRouter);

// User Card Routes
const cardRouter = require("./routes/card.js");
app.use(cardRouter);

// User Message Routes
const messageRouter = require("./routes/message.js");
app.use(messageRouter);

// User Cart Routes
const cartRouter = require("./routes/cart.js");
app.use(cartRouter);

// User Order Routes
const orderRouter = require("./routes/order.js");
app.use(orderRouter);

// User Address Routes
const addressRouter = require("./routes/address.js");
app.use(addressRouter);

//Expose API to port 4000
const port = 4000;
app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});
