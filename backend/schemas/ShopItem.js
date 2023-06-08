const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShopItem = new Schema({
  id: Number,
  name: String,
  image: String,
  stock: Number,
  description: String,
  price: Number,
  tag: String,
});

module.exports = mongoose.model("ShopItem", ShopItem);
