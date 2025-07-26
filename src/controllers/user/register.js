const { User, Otp } = require("../../models");
const jwtSign = require("../../utilities/helpers/encryption/jwtSign");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../../middlewares/authorization.middlewares/asyncHandler");
const {sendMail} = require("../../services/email");
const { verify } = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
    const { fullname, email, password, recoveryEmail, phone } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { phone }], verified: true });
    if (exists) return next(new Error("Email or phone already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ إنشاء المستخدم
    const user = await User.create({
        fullname,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        recoveryEmail,
        isVerified: false,
    });

    // ✅ إنشاء OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpDoc = await Otp.create({
        email: user.email,
        phone: user.phone,
        user: user._id,
        code: otpCode,
    });

    // ✅ إرسال البريد
    await sendMail(
        email,
        "OTP Verification",
        `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
        <div style="background-color: #2196F3; color: #fff; padding: 10px; text-align: center;">
          <h2 style="margin: 0;">OTP Verification</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px;">Your OTP is: <strong>${otpCode}</strong></p>
        </div>
      </div>
    </div>
    `
    );

    // ✅ إنشاء توكن
    const otpToken = jwtSign(
        {
            otpId: otpDoc._id.toString(),
            otpCode,
            user: user._id,
        },
        "10m"
    );

    res.status(201).json({
        message: "User created. OTP sent.",
        otpToken,
        userId: user._id,
    });
});

module.exports = register;
