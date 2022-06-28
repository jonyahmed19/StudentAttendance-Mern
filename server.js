const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bycrpt = require("bcrypt");
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
 * /register endpoint
 * Name, Email, password
 * password should be hash
 */

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Fields must not be empty!" });
  }
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

  const salt = await bycrpt.genSalt(10);
  const hash = await bycrpt.hash(password, salt);
  user.password = hash;

  await user.save();
  return res.status(201).json({ message: "User registered successfully" });
});

app.get("/", localLogger, (req, res, next) => {
  res.send("<h2>local Servers</h2>");
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database is connected");

    app.listen(4000, () => {
      console.log("App is running");
    });
  })
  .catch((e) => console.log(e));
