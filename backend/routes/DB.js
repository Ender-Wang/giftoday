const express = require("express");
const router = express.Router();
const UserDB = require("../schemas/User.js");
const ShopItemDB = require("../schemas/ShopItem.js");

module.exports = { express, router, UserDB, ShopItemDB };
