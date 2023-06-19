const { router, UserDB } = require("./DB.js");

//Registration
router.post("/user/registration", (req, res) => {
  const { email } = req.body;

  UserDB.findOne({ email }) // Check if email already exists in the database
    .then((existingUser) => {
      if (existingUser) {
        // If email exists, send a response indicating that the email is already registered
        return res.status(409).json({ error: "Email already registered" });
      }

      // Generate a new user ID
      UserDB.countDocuments().then((count) => {
        let userID = count + 1;
        req.body.id = userID;

        var { id, name, password, address } = req.body;
        var newUser = new UserDB({
          id,
          name,
          email,
          password,
          address,
        });

        newUser
          .save()
          .then((user) => {
            console.log(
              "Registration successful with user: ",
              user.name,
              " id ",
              user.id
            );
            return res.json(user);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
