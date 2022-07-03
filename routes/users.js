const router = require("express").Router();
const usersController = require("../controller/users");

/**
 * Get user by id or email
 * @method GET
 */

router.get("/:userId", usersController.getUserByID);

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", usersController.postUserById);

/**
 * Update user by id
 * @method PATCH
 */
router.patch(":/userId", usersController.patchUserById);

/**
 * Delete user by id
 * @method DELETE
 */
router.delete("/:userId", usersController.deleteUserById);

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @method GET
 * @route api/v1/users?sort["by", "name"]
 * @visibility private
 */
router.get("/", usersController.getUsers);

/**
 * Create new user
 */

router.post("/", usersController.postUser);

module.exports = router;
