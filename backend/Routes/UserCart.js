const express = require("express");
const router = express.Router();
const Cart = require("../models/Carts");
const bodyParser = require("body-parser");
// const { create } = require("../models/User");

router.post("/UserCart", bodyParser.json(), async (req, res) => {
  const reqJson = req.body;
  try {
    let UserCart = await Cart.findOne({ email: reqJson.email });
    if (!UserCart) {
      await Cart.create({
        email: reqJson.email,
        items: reqJson.newAr,
      });
    } else {
      const updateCart = await Cart.updateOne({ email: reqJson.email }, { items: reqJson.newAr });
      return res.json({ message: "success" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/newCart", bodyParser.json(), async (req, res) => {
  try {
    const response = await Cart.create({
      email: req.body.email,
      items: [],
    });
    return res.status(200).json({ message: "success" });
  } catch {
    return res.status(500).json({ message: "error" });
  }
});
router.post("/getCart", bodyParser.json(), async (req, res) => {
  try {
    const response = await Cart.findOne({ email: req.body.email });
    return res.json({ response });
  } catch {
    return res.status(500).json({ message: "error" });
  }
});

module.exports = router;
