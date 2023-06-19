const { router, UserDB } = require("./DB.js");

//Demo: get all info from all users
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
