const mongoose = require('mongoose');
const { otpExpired } = require('../../config/constants');
const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
}, {
    timestamps: true,
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: otpExpired });

module.exports = otpSchema;