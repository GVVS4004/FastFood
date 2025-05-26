// middleware/checkAuth.js
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "Thisisvijay";

function checkAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided or wrong format" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = checkAuth;
