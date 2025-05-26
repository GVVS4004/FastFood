const express = require("express");
const router = express.Router();
const User = require("../models/Admin");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const jwtSecret = process.env.JWT_SECRET || "Thisisvijay";
router.post("/authAdmin", [body("email").isEmail({ min: 5 })], bodyParser.json(), async (req, res) => {
  try {
    let userData = await Admin.findOne({ email: req.body.email });
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
router.post("/createAdmin", [body("name").isLength({ min: 1 })], bodyParser.json(), async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);
  try {
    await Admin.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
    });
    let adminData = await Admin.findOne({ email: req.body.email });
    const data = {
      user: {
        id: adminData.id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);

    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

module.exports = router;
