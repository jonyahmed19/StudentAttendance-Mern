const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerServie = async ({ name, email, password }) => {
  /**
   * Checking email exists or not
   */
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exist" });
  }

  user = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;

  await user.save();
};
const loginServie = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credential" });
  }

  const isValidPassowrd = await bcrypt.compare(password, user.password);

  if (!isValidPassowrd) {
    return res.status(400).json({ message: "Invalid credential" });
  }

  delete user._doc.password;
  const token = jwt.sign(user?._doc, "jony", { expiresIn: "2h" });
  return token;
};

module.exports = {
  registerServie,
  loginServie,
};
