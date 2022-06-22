const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const obj = {
    name: "Sahidul",
    email: "hello@gmail.com",
  };
  res.json(obj);
});

app.listen(4000, () => {});
