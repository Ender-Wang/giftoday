const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopItem = new Schema({
  // id: { type: Number, unique: true },
  id: Number,
  name: String,
  stock: Number,
  description: String,
  price: Number,
  tag: String,
});

module.exports = mongoose.model("ShopItem", ShopItem);
