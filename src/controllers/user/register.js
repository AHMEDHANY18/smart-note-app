const { User, Otp } = require("../../models");
const jwtSign = require("../../utilities/helpers/encryption/jwtSign");
const bcrypt = require("bcryptjs");
const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { sendMail } = require("../../services/email");
const registerValidation = require("./userValidatons/registerValidation");

const register = asyncHandler(async (req, res, next) => {
  // ✅ التحقق من البيانات
  const { error, value } = registerValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((err) => err.message),
    });
  }

  const { fullname, email, password, recoveryEmail, phone } = value;

  const exists = await User.findOne({
    $or: [{ email }, { phone }],
    verified: true,
  });
  if (exists) return next(new Error("Email or phone already exists"));

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullname,
    email,
    phone,
    password: hashedPassword,
    recoveryEmail,
    isVerified: false,
  });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email: user.email });

  const otpDoc = await Otp.create({
    email: user.email,
    phone: user.phone,
    user: user._id,
    code: otpCode,
  });
  // await sendMail(
  //     email,
  //     "OTP Verification",
  //     `
  // <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  //   <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
  //     <div style="background-color: #2196F3; color: #fff; padding: 10px; text-align: center;">
  //       <h2 style="margin: 0;">OTP Verification</h2>
  //     </div>
  //     <div style="padding: 20px;">
  //       <p style="font-size: 16px;">Your OTP is: <strong>${otpCode}</strong></p>
  //     </div>
  //   </div>
  // </div>
  // `
  // );
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
