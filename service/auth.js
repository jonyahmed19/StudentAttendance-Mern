const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");

const registerServie = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  /**
   * Checking email exists or not
   */
  let user = await findUserByProperty("email", email);
  if (user) {
    throw error("User already exist", 400);
  }

  user = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash, roles, accountStatus });
};
const loginServie = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw error("Invalid credential", 400);
  }

  const isValidPassowrd = await bcrypt.compare(password, user.password);

  if (!isValidPassowrd) {
    throw error("Invalid credential", 400);
  }

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  const token = jwt.sign(payload, "jony", { expiresIn: "2h" });
  return token;
};

module.exports = {
  registerServie,
  loginServie,
};
