const { router, UserDB } = require("./DB.js");

// Get user General info: [id, name, email, password, premium]
router.get("/user/:userID/premium", (req, res) => {
  const { userID } = req.params;
  let id = Number(userID);

  UserDB.findOne({ id: id }) // Find the user by ID
    .then((user) => {
      if (user) {
        res.json(user.premium);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

//Set premium status
router.put("/user/:userID/premium", async (req, res) => {
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
        res.status(200).json({ message: "Premium upgrade successful.", user });
      } else {
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

module.exports = router;
