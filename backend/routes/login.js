const { router, UserDB } = require("./DB.js");

//Login
router.post("/user/login", (req, res) => {
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
      const response = {
        userID: user.id,
      };
      return res.json(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
