const mongoose = require("mongoose");
const { Schema } = mongoose;

const Shop = new Schema({
  id: Number,
  name: String,
  stock: Number,
  description: String,
  price: Number,
  tag: String,
});

module.exports = mongoose.model("Shop", Shop);
