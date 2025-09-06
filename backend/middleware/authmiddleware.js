const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // 👀 check payload
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token is not valid" });
  }
};

module.exports = verifyToken;
