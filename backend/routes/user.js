const { router, UserDB } = require("./DB.js");

// Get all users' data
router.get("/users", (req, res) => {
  UserDB.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
