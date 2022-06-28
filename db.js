const mongoose = require("mongoose");

const connectDB = (connectStr) => {
  return mongoose.connect(connectStr);
};

module.exports = connectDB;
