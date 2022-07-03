const { loginServie, registerServie } = require("../service/auth");
/**
 * /register endpoint
 * Name, Email, password
 * Find user by email
 * Password should be hash
 */
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fields must not be empty!" });
  }

  try {
    const user = await registerServie({ name, email, password });
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (e) {
    next(e);
  }
};

/**
 * /login endpoint
 * Email, Password
 * Firstly find user by email
 * Email, Password need to match
 */
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginServie({ email, password });
    return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  registerController,
};
