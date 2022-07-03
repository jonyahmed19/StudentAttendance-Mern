const User = require("../models/User");

const getUsers = (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
};

const getUserByID = (req, res, next) => {};
const postUser = (req, res, next) => {};
const postUserById = (req, res, next) => {};
const patchUserById = (req, res, next) => {};
const deleteUserById = (req, res, next) => {};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  postUserById,
  deleteUserById,
  patchUserById,
};
