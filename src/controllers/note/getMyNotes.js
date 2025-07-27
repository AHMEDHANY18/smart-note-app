const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const getMyNotes = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const notes = await Note.find({ ownerId: user._id,deleted:false }).sort({ createdAt: -1 }).populate("category");

  res.status(200).json({
    message: "Your notes fetched successfully 📒",
    notes,
  });
});

module.exports = getMyNotes;
