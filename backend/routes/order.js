const { router, UserDB } = require("./DB.js");

//TODO: Get user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
router.get("/user/:userID/order", async (req, res) => {
  try {
    const { userID } = req.params;
    let id = Number(userID);
    const user = await UserDB.findOne({ id });
    const order = user.order;
    return res.status(200).json(order);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

//TODO: Post user Order info with user id: id, gift: [id, name, description, price, tag: [id, name]], card: [id, number, cvv, expMonth, expYear], address: [id, fullName, postalCode, street, city, country], shippingDate
router.put("/user/:userID/order", async (req, res) => {
  try {
    const { userID } = req.params;

    const { id, total, gift, card, address, shippingDate } = req.body;

    console.log("userID " + userID);
    // if (!order) {
    //   throw new Error("There is no order");
    // }
    // Retrieve the existing user data from the database
    const user = await UserDB.findOne({ id: userID });

    if (!user) {
      throw new Error("User not found");
    }

    const newOrder = {
      id: id,
      total: total,
      gift: gift,
      card: card,
      address: address,
      shippingDate: shippingDate,
    };

    // Update the user data with the new message
    user.order.push(newOrder);
    await user.save();

    return res.status(200).json({
      order: newOrder,
      id: userID,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//delete the order
router.delete("/user/:userID/order/:orderID", async (req, res) => {
  try {
    const { userID, orderID } = req.params;
    const id = Number(userID);
    const OID = Number(orderID);

    const user = await UserDB.findOne({ id: id });
    if (!user) {
      throw new Error("User not found");
    }

    const orderIndex = user.order.findIndex((order) => order.id === OID);
    if (orderIndex === -1) {
      throw new Error("Order not found");
    }

    user.order.splice(orderIndex, 1); // 从订单数组中删除订单

    await user.save(); // 将更改保存回数据库

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
