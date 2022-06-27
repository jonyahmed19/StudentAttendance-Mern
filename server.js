const express = require("express");

const app = express();

const localLogger = (req, res, next) => {
  console.log(req.url, req.method);

  return res.json([{ works: "works" }]);
};

app.get("/", localLogger, (req, res, next) => {
  res.send("<h2>local Servers</h2>");
});

app.listen(4000, () => {
  console.log("App is running");
});
