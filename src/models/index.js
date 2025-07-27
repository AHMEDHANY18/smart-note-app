const { default: mongoose } = require("mongoose");
const { userSchema, otpSchema, revokedTokenSchema, noteSchema, categorySchema } = require("./schemas");

module.exports = {
  User: mongoose.model("User", userSchema),
  Otp: mongoose.model("Otp", otpSchema),
  RevokedToken: mongoose.model("revokedToken", revokedTokenSchema),
  Note: mongoose.model("Note", noteSchema),
  Category: mongoose.model("Category", categorySchema)
};
