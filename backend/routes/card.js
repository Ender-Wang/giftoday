const { router, UserDB } = require("./DB.js");

// Get user Card info by user id
router.get("/user/:userID/card", async (req, res) => {
  try {
    const { userID } = req.params;
    const uid = Number(userID);

    const user = await UserDB.findOne({ id: uid }); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cardInfo = user.card;
    if (!cardInfo) {
      return res
        .status(404)
        .json({ error: "Card information not found for the user" });
    }

    res.status(200).json({ cardInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//TODO: Post user Card info with user id: [id, number, cvv, expMonth, expYear]
router.put("/user/:userID/card", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const { cardNumber, cvv, expiryDate, logo } = req.body;
    if (!cardNumber) {
      throw new Error("Invalid card value");
    }
    const user = await UserDB.findOne({ id }); // Find the user by ID
    if (!user) {
      throw new Error("User not found");
    }
    // console.log("User card:", user.card);
    const existingCard = await UserDB.findOne({
      "card.cardNumber": cardNumber,
    });
    if (existingCard) {
      return res.status(409).json({ message: "Card number already exists" });
    }
    const newCard = {
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
      logo: logo,
    };
    //remove before card
    // user.card = [];
    user.card.push(newCard);
    await user.save();
    return res.status(200).json({
      message: "Card information updated.",
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      cvv: cvv,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete user Card info by card number
router.delete("/user/:userID/card/:cardNumber", async (req, res) => {
  try {
    const { userID, cardNumber } = req.params;
    const uid = Number(userID);
    const CID = Number(cardNumber);

    const user = await UserDB.findOne({ id: uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cardIndex = user.card.findIndex((card) => card.cardNumber === CID);
    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found" });
    }

    user.card.splice(cardIndex, 1); // Remove the card at the specified index
    await user.save();

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
