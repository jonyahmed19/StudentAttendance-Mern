const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
    },
  },
  password: {
    type: String,
    minLength: [3, "Password is too short"],
    maxLength: [30, "Password is too long"],
    required: true,
  },
  role: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    required: true,
    default: "PENDING",
  },
});

const User = model("User", userSchema);

module.exports = User;
