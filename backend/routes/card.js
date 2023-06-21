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
    const { cardNumber, cvv, expiryDate } = req.body;
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

module.exports = router;
