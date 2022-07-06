const User = require("../models/User");

const findUsers = () => {
  return User.find();
};

module.exports = findUsers;
