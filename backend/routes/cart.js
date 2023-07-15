const { router, UserDB } = require("./DB.js");

//Get user Cart info with user id
router.get("/user/:userID/finalcart", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const user = await UserDB.findOne({ id });
    const cart = user.cart;
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
});

//Get user Cart info with user id
router.get("/user/:userID/cart", async (req, res) => {
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

//Add Gift to user Cart
router.put("/user/:userID/cart", async (req, res) => {
  try {
    const { userID } = req.params;
    const uid = Number(userID);
    const { id, name, image, description, price, tag } = req.body;

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
        image: image,
        description: description,
        price: price,
        quantity: 1,
        tag: tag,
      };
      user.cart.push(newGift);
    }
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

// add gift in user cart
router.put("/user/:userID/cartAdd/:cartID", async (req, res) => {
  try {
    const { userID, cartID } = req.params;
    const uid = Number(userID);
    const cID = Number(cartID);

    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      throw new Error("User not found");
    }

    const existingGiftIndex = user.cart.findIndex((gift) => gift.id === cID);

    user.cart[existingGiftIndex].quantity += 1;
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

// reduce gift in user cart
router.put("/user/:userID/cartReduce/:cartID", async (req, res) => {
  try {
    const { userID, cartID } = req.params;
    const uid = Number(userID);
    const cID = Number(cartID);

    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      throw new Error("User not found");
    }

    const existingGiftIndex = user.cart.findIndex((gift) => gift.id === cID);

    if (user.cart[existingGiftIndex].quantity > 1) {
      user.cart[existingGiftIndex].quantity -= 1;
    }

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

//delete the gift in the cart
router.delete("/user/:userID/cart/:cartID", async (req, res) => {
  try {
    const { userID, cartID } = req.params;
    const id = Number(userID);
    const OID = Number(cartID);

    const user = await UserDB.findOne({ id: id });
    if (!user) {
      throw new Error("User not found");
    }

    const cartIndex = user.cart.findIndex((cart) => cart.id === OID);
    if (cartIndex === -1) {
      throw new Error("Order not found");
    }

    user.cart.splice(cartIndex, 1);

    await user.save();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete all cart items for a user
router.delete("/user/:userID/cart", async (req, res) => {
  try {
    const { userID } = req.params;
    const uid = Number(userID);

    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      throw new Error("User not found");
    }

    user.cart = []; // Empty the cart array

    await user.save(); // Save the changes to the database

    res.status(200).json({ message: "All cart items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
