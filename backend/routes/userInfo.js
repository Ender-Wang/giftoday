// User info: [id, name, email, password]
const { router, UserDB } = require("./DB.js");

// Get user General info: [id, name, email, password, premium]
router.get("/user/:userID/info", (req, res) => {
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

//Update the profile information of customer
router.put("/user/userInfo", async (req, res) => {
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

    console.log("User Information has been updated: ", updatedUser);
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Errors in the server" });
  }
});

module.exports = router;
