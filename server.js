const express = require("express");
const connectDB = require("./db");
const app = express();
const morgan = require("morgan");
const authenticate = require("./middleware/authenticate");

const routes = require("./routes");

/**
 * morgan for log
 */

app.use(morgan("dev"));

/**
 *
 * Body Parser Middleware
 */

app.use(express.json());

app.use(routes);

/**
 * /private endpoint
 */
app.get("/private", authenticate, async (req, res) => {
  return res.status(200).json({ message: "User Authorized" });
});

app.get("/", (req, res, next) => {
  res.send("<h2>local Servers</h2>");
});

/**
 * Database error checking
 */
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: "Server error occurred" });
// });

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database is connected");

    app.listen(4000, () => {
      console.log("App is running: 4000");
    });
  })
  .catch((e) => console.log(e));
