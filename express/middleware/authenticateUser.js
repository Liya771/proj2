// middleware/authenticate.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔐 Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id, email, ... }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
