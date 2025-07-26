const { Otp, User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {asyncHandler} = require("../../middlewares/authorization.middlewares/asyncHandler");

const resetPassword = asyncHandler(async (req, res, next) => {
  const { otpCode, newPassword } = req.body;

  if ( !otpCode || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

   const token = req.user;
   if (!token) {
     return res.status(401).json({ message: "Unauthorized: No user context" });
   }

   // ابحث عن OTP المرتبط بالإيميل أو الهاتف
   const otpDoc = await Otp.findOne({
     $or: [{ email: token.email }, { phone: token.phone }],
   });
   console.log("🚀 ~ otpDoc:", otpDoc);

   if (!otpDoc) {
     return res.status(400).json({ message: "OTP not found or expired" });
   }

   if (otpDoc.code !== otpCode) {
     return res.status(400).json({ message: "Invalid OTP code" });
   }

   // تحديث حالة التحقق
   const existingUser = await User.findById(token._id);
   if (!existingUser) {
     return res.status(404).json({ message: "User not founasdasdd" });
   }


  // 4. تحديث الباسورد
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  existingUser.password = hashedPassword;
  await existingUser.save();

  // 5. حذف الـ OTP
  await Otp.deleteMany({ email: existingUser.email });

  res.status(200).json({ message: "Password reset successfully ✅" });
});

module.exports = resetPassword;
