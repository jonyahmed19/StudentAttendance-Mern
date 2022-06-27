const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/test", {
    serverSelectionTimeoutMS: 100,
  })
  .then(async () => {
    console.log("Connected");
    await creaUser({
      name: "Abid Hossain",
      email: "abidali@cric.com",
    });
    await mongoose.connection.close();
  })
  .catch((e) => {
    console.log(e);
  });

const Schema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", Schema);

async function creaUser(data) {
  const user = new User({ ...data });
  await user.save();
  return user;
}
