import mongoose from "mongoose";

const userCollection = "User";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rolAdmin: Boolean,
  rolPremium: Boolean,
  lastConnection: String,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
