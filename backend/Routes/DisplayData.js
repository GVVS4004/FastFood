const express = require("express");
const router = express.Router();
// const User = require('../models/User');
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const FoodItems = require("../models/FoodItems");
const FoodCategory = require("../models/FoodCategory");

router.post("/foodData", async (req, res) => {
  try {
    const foodItems = await FoodItems.find({});
    const categories = await FoodCategory.find({});
    res.send([foodItems, categories]);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
