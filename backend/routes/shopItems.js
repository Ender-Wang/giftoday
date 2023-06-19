const express = require("express");
const router = express.Router();
const ShopItemDB = require("../schemas/ShopItem.js");

//Get all shopItems
router.get("/shopItems", async (req, res) => {
  try {
    const shopItems = await ShopItemDB.find();
    res.json(shopItems);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal server error" });
  }
});

//Get shopItem by id
router.get("/shopItem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shopItem = await ShopItemDB.findOne({ id });
    res.json(shopItem);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: "ShopItem not found" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
