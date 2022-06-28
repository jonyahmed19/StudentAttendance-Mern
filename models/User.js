const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
    },
  },
  password: String,
  role: [String],
  accountStatus: String,
});

const User = model("User", userSchema);

module.exports = User;
