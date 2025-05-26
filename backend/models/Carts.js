const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  email: { type: String, unique: true },
  items: {
    type: Array,
  },
});

module.exports = mongoose.model("carts", cartSchema);
