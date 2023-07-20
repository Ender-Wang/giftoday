const { router, UserDB } = require("./DB.js");

// get user info by user id
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
    const {
      id,
      name,
      email,
      password,
      phoneNumber,
      postalCode,
      street,
      city,
      country,
    } = req.body;

    const updatedUser = await UserDB.findOneAndUpdate(
      { id },
      {
        name,
        email,
        password,
        "address.0.fullName": name,
        "address.0.phoneNumer": phoneNumber,
        "address.0.postalCode": postalCode,
        "address.0.street": street,
        "address.0.city": city,
        "address.0.country": country,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Not found user" });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Errors in the server" });
  }
});

module.exports = router;
