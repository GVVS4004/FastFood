// routes/ValidateToken.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "Thisisvijay";

require("dotenv").config();

router.get("/validateToken", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return res.status(200).json({ success: true, message: "Token is valid", user: decoded });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

module.exports = router;
