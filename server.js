const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const app = express();

/**
 *
 * Body Parser Middleware
 */

app.use(express.json());

const localLogger = (req, res, next) => {
  console.log(req.url, req.method);

  return res.json([{ works: "works" }]);
};

/**
 * /login endpoint
 * Email, Password
 * Firstly find user by email
 * Email, Password need to match
 */

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const isValidPassowrd = await bcrypt.compare(password, user.password);

    if (!isValidPassowrd) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    delete user._doc.password;

    return res.status(200).json({ message: "Login successful", user });
  } catch (e) {
    next(e);
  }
});

/**
 * /register endpoint
 * Name, Email, password
 * Find user by email
 * Password should be hash
 */

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fields must not be empty!" });
  }
  try {
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
    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    next(e);
  }
});

app.get("/", localLogger, (req, res, next) => {
  res.send("<h2>local Servers</h2>");
});

/**
 * Database error checking
 */

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error occurred" });
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database is connected");

    app.listen(4000, () => {
      console.log("App is running");
    });
  })
  .catch((e) => console.log(e));
