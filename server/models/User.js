const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "New user",
  },
  email: {
    type: String,
  },
  phone: {
    phoneNumber: {
      type: String,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  productListings: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
