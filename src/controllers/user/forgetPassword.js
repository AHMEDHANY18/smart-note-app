const { asyncHandler } = require("../../middlewares/authorization.middlewares/asyncHandler");
const { User, Otp } = require("../../models");
const sendMail = require("../../services/email");
const jwtSign = require("../../utilities/helpers/encryption/jwtSign");

const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // 1. تحقق إن المستخدم موجود
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(404).json({ message: "User not found with this email" });
  }

  // 2. إنشاء OTP جديد
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  // 3. احذف OTPs القديمة
  await Otp.deleteMany({ email: user.email });

  // 4. خزّن OTP
  const otpDoc = await Otp.create({
    email: user.email,
    phone: user.phone,
    user: user._id,
    code: otpCode,
  });

  // 5. أنشئ توكن
  const otpToken = jwtSign(
    {
      otpId: otpDoc._id.toString(),
      otpCode,
      user: user._id,
    },
    "10m"
  );

  // 6. إرسال البريد الإلكتروني
//   await sendMail(
//     email,
//     "Reset Password OTP",
//     `
//     <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 5px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
//         <div style="background-color: #e91e63; color: #fff; padding: 10px; text-align: center;">
//           <h2 style="margin: 0;">Reset Your Password</h2>
//         </div>
//         <div style="padding: 20px;">
//           <p>Your OTP code is:</p>
//           <p style="font-size: 24px; font-weight: bold;">${otpCode}</p>
//           <p>This code will expire in 10 minutes.</p>
//         </div>
//       </div>
//     </div>
//     `
//   );

  res.status(200).json({
    message: "OTP sent to your email",
    otpToken,
  });
});

module.exports = forgetPassword;
