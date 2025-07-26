const mongoose = require("mongoose");
const { USERS_ROLES } = require("../../config/constants");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    role:{ type: String, default:USERS_ROLES.USER},
    email:{ type: String,Required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: false, default: "avatar.png" },
    blocked: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = UserSchema;
