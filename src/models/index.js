const { default: mongoose } = require("mongoose");
const {
  userSchema,
  otpSchema,

} = require("./schemas");

module.exports = {

  User: mongoose.model("User", userSchema),
  Otp: mongoose.model('Otp', otpSchema),


};
