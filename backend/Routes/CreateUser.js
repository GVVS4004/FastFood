const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "Thisisvijay";

router.post("/createUser", [body("name").isLength({ min: 1 })], bodyParser.json(), async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      location: req.body.location,
    });
    let userData = await User.findOne({ email: req.body.email });
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

router.post("/authUser", [body("email").isEmail({ min: 5 })], bodyParser.json(), async (req, res) => {
  try {
    let userData = await User.findOne({ email: req.body.email });
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
    if (!userData) {
      return res.status(400).json({ errors: "Not a valid email" });
    }
    if (!pwdCompare) {
      return res.status(400).json({ errors: "Not a valid password" });
    }
    const data = {
      user: {
        id: userData.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
