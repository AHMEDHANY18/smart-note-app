
const { asyncHandler } = require("../../middlewares/authorization.middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
const { RevokedToken } = require("../../models");

const logout = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ message: "Authorization token required" });
  }

  const strippedToken = token.trim(); // ✅ مفيش Bearer

  // ✅ تحقق من التوكن
  try {
    jwt.verify(strippedToken, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // ✅ استخراج تاريخ الانتهاء من التوكن
  const payload = JSON.parse(
    Buffer.from(strippedToken.split(".")[1], "base64").toString()
  );

  const expiresAt = new Date(payload.exp * 1000);

  await RevokedToken.create({
    token: strippedToken,
    expiresAt,
  });

  res.status(200).json({ message: "Logged out successfully ✅" });
});

module.exports = logout;
