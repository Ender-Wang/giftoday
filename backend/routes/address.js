const express = require("express");
const router = express.Router();
const UserDB = require("../schemas/User.js");

//TODO: Get user Address info with user id: [id, fullName, postalCode, street, city, country, phoneNumber]
router.get("/user/:userID/address", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const user = await UserDB.findOne({ id });
    const address = user.address;
    return res.status(200).json(address);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

//TODO: Post user Address info with user id: [id, fullName, postalCode, street, city, country]
router.put("/user/:userID/address", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const { phoneNumber, fullName, postalCode, street, city } = req.body;

    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    const address = user.address;
    // Find the maximum ID using reduce
    const biggestID = address.reduce(
      (maxID, address) => (address.id > maxID ? address.id : maxID),
      0
    );
    const newAddress = {
      id: biggestID + 1,
      fullName: fullName,
      postalCode: postalCode,
      street: street,
      city: city,
      country: "Germany",
      phoneNumber: phoneNumber,
    };

    // Update the user data with the new message
    user.address.push(newAddress);
    await user.save();

    return res.status(200).json({
      id: id,
      fullName: fullName,
      postalCode: postalCode,
      street: street,
      city: city,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//delete address
router.delete("/user/:userID/address/:addressID", async (req, res) => {
  const { userID, addressID } = req.params;
  let userId = Number(userID);
  let aID = Number(addressID);

  try {
    const user = await UserDB.findOne({ id: userId });
    const addressIndex = user.address.findIndex((addr) => addr.id === aID);
    if (addressIndex === -1) {
      return res.status(404).json({ error: "address not found" });
    }
    user.address.splice(addressIndex, 1);
    await user.save();
    return res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
});

//delete address
router.delete("/user/:userID/address", async (req, res) => {
  const { userID } = req.params;
  let userId = Number(userID);

  try {
    const user = await UserDB.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.address = []; // Clear all addresses by assigning an empty array
    await user.save();

    return res.status(200).json({ message: "All addresses deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
