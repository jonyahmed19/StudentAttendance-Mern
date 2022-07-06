const User = require("../models/User");
const userService = require("../service/user");

const getUsers = async (req, res, next) => {
  /**
   *
   * TODO: filter, sort, pagination, select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserByID = async (req, res, next) => {};
const postUser = async (req, res, next) => {};
const patchUserById = async (req, res, next) => {};
const deleteUserById = async (req, res, next) => {};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  deleteUserById,
  patchUserById,
};
