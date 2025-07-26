const { asyncHandler } = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Otp, User } = require("../../models");

const verifyOtp = asyncHandler(async (req, res, next) => {
    const { otpCode } = req.body;

    const token = req.user;
    console.log("🚀 ~ authorization:", token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No user context" });
    }

    // ابحث عن OTP المرتبط بالإيميل أو الهاتف
    const otpDoc = await Otp.findOne({
        $or: [
            { email: token.email },
            { phone: token.phone }
        ]
    });

    if (!otpDoc) {
        return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (otpDoc.code !== otpCode) {
        return res.status(400).json({ message: "Invalid OTP code" });
    }

    // تحديث حالة التحقق
    const existingUser = await User.findById(token._id);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    existingUser.verified = true;
    await existingUser.save();

    await otpDoc.deleteOne();

    res.status(200).json({
        message: "OTP verified successfully. Account activated ✅",
    });
});

module.exports = verifyOtp;
