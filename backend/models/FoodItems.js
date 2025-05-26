const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");

const FoodItems = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("fooddata", FoodItems, "fooddata");
