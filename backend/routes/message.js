const express = require("express");
const router = express.Router();
const UserDB = require("../schemas/User.js");

//Get user Message info with user id: [id, message, date]
router.get("/user/:userID/message", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const user = await UserDB.findOne({ id });
    const message = user.message;
    // console.log("message " + message);
    return res.status(200).json(message);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: "Messages not found" });
    } else {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add user Message info with user id: [id, message, date]
router.put("/user/:userID/message", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const { message, tag, date } = req.body;

    if (!message) {
      throw new Error("Invalid message value");
    }
    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id });

    if (!user) {
      throw new Error("User not found");
    }
    const messages = user.message;
    // Find the maximum ID using reduce
    const biggestID = messages.reduce(
      (maxID, message) => (message.id > maxID ? message.id : maxID),
      0
    );

    const newMessage = {
      id: biggestID + 1,
      message: message,
      date: date,
      tag: tag,
    };

    // Update the user data with the new message
    user.message.push(newMessage);
    await user.save();

    return res.status(200).json({
      message: message,
      id: id,
      tag: tag,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete user message by message id
router.delete("/user/:userID/message/:messageID", async (req, res) => {
  const { userID, messageID } = req.params;
  let userId = Number(userID);
  let mID = Number(messageID);

  try {
    const user = await UserDB.findOne({ id: userId });
    const messageIndex = user.message.findIndex((msg) => msg.id === mID);
    if (messageIndex === -1) {
      return res.status(404).json({ error: "Message not found" });
    }
    user.message.splice(messageIndex, 1);
    await user.save();
    return res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
