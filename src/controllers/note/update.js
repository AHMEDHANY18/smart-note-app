const {
    asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const updateNote = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { title, content, category } = req.body;

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
            .json({ message: "You don't have permission to update this note" });
    }

    // تحديث الحقول اللي تم إرسالها فقط
    if (title) note.title = title;
    if (content) note.content = content;
    if (category) note.category = category;

    await note.save();

    res.status(200).json({
        message: "Note updated successfully 📝",
        note,
    });
});

module.exports = updateNote;
