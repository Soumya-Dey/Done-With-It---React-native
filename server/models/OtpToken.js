const mongoose = require("mongoose");

const OtpTokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  otpToken: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    expires: 300,
    default: Date.now,
  },
});

const OtpToken = mongoose.model("OtpToken", OtpTokenSchema);

module.exports = OtpToken;
