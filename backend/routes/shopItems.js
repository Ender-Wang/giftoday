const { router, ShopItemDB } = require("./DB.js");

//Get all shopItems
router.get("/shopItems", async (req, res) => {
  try {
    const shopItems = await ShopItemDB.find();

    res.json(shopItems.filter((item) => item.stock > 0));
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/allShopItems", async (req, res) => {
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

//Update shopItem stock by corresponding gift id
router.put("/shopItems", async (req, res) => {
  try {
    const { gift } = req.body;
    for (let i = 0; i < gift.length; i++) {
      const id = gift[i].id;
      const quantity = gift[i].quantity;
      const item = await ShopItemDB.findOne({ id });
      const leftStock = item.stock > quantity ? item.stock - quantity : 0;
      const updatedShopItems = await ShopItemDB.findOneAndUpdate(
        { id },
        {
          stock: leftStock,
        },
        { new: true }
      );
      res.json(updatedShopItems);
    }
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
