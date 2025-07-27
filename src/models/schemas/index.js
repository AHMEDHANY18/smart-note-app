
const userSchema = require("./user.schema.js");
const otpSchema = require("./otp.schema.js");
const revokedTokenSchema = require("./RevokedToken.js");
const noteSchema=require("./note.js")
const categorySchema = require("./category.js");


module.exports = {
  userSchema,
  otpSchema,
  revokedTokenSchema,
  noteSchema,
  categorySchema,
};
