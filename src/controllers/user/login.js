const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

const loginController = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // 1. التحقق من وجود المستخدم
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. التحقق من كلمة المرور
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. إنشاء JWT
    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginController;
