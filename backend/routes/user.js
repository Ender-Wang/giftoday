const express = require("express");
const router = express.Router();
const UserDB = require("../schemas/User.js");

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
