const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { User } = require("../../models");
const path = require("path");

const uploadProfilePicController = asyncHandler(async (req, res) => {
  const user = req.user;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join("uploads", file.filename);

  // تحديث المستخدم في الداتا
  const updatedUser = await User.findByIdAndUpdate(
    { _id:user._id,verified:true},
    { avatar: filePath },
    { new: true }
  );

  res.status(200).json({
    message: "Profile picture updated successfully",
    profilePic: filePath,
    user: updatedUser,
  });
});

module.exports = uploadProfilePicController;
