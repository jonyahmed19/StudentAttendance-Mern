const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, "jony");

    console.log("Decoded", decoded);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
    req.user = User;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unathorized Token" });
  }
};

module.exports = authenticate;
