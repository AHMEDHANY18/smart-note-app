const { default: mongoose } = require("mongoose");
const { userSchema, otpSchema, revokedTokenSchema } = require("./schemas");

module.exports = {
  User: mongoose.model("User", userSchema),
  Otp: mongoose.model("Otp", otpSchema),
  RevokedToken: mongoose.model("revokedToken", revokedTokenSchema),
};
