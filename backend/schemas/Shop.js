const mongoose = require("mongoose");
const { Schema } = mongoose;

const Shop = new Schema({
  id: { type: Number, unique: true },
  name: String,
  description: String,
  price: Number,
  tag: String,
});

module.exports = mongoose.model("Shop", Shop);
