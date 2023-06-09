const mongoose = require("mongoose");
const { Schema } = mongoose;

const Holiday = new Schema({
  id: { type: Number, unique: true },
  name: String,
  date: Date,
  tag: String,
});

module.exports = mongoose.model("Holiday", Holiday);
