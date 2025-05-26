const mongoose = require("mongoose");
// const { required } = require("nodemon/lib/config");

const Categories = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("foodcategory", Categories, "foodcategory");
