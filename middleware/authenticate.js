const User = require('../models/User');
const  jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
  let token = req.headers.authorization;
  try {
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    const decoded = jwt.verify(token, "jony");
    const user = await User.findById(decoded._id)
    if (!user) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authenticate;
