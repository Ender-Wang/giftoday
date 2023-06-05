const mongoose = require("mongoose");
const { Schema } = mongoose;

const Tag = new Schema({
  id: Number,
  name: String,
});

const Address = new Schema({
  id: Number,
  fullName: String,
  postalCode: String,
  street: String,
  city: String,
  country: String,
});

const Gift = new Schema({
  id: Number,
  name: String,
  stock: Number,
  description: String,
  price: Number,
  tag: Tag,
});

const Card = new Schema({
  id: Number,
  number: String,
  cvv: String,
  expMonth: Number,
  expYear: Number,
});

const Message = new Schema({
  id: Number,
  message: String,
  date: Date,
  tag: Tag,
});

const Cart = new Schema({
  gift: [Gift],
});

const Order = new Schema({
  id: Number,
  cancelled: Boolean,
  gift: [Gift],
  card: Card,
  address: Address,
  shippingDate: Date,
});

const User = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  premium: { type: Boolean, default: false },
  card: { type: [Card], default: [] },
  message: { type: [Message], default: [] },
  cart: { type: Cart, default: null },
  order: { type: [Order], default: [] },
  address: { type: [Address], default: [] },
});

module.exports = mongoose.model("User", User);
