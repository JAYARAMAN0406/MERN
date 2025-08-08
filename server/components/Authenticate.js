const jwt = require("jsonwebtoken");  // ✅ Import JWT
const JWT_SECRET = process.env.JWT_SECRET || "1234567890"; // use env variable

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user; // attach user to request
    next();
  });
};

module.exports = authenticateToken;
