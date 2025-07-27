const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.ownerId.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You don't have permission to access this note" });
  }
  note.deleted=true
  note.save()
  res.status(200).json({
    message: "Note fetched successfully 📝",
    note,
  });
});

module.exports = deleteNote;
