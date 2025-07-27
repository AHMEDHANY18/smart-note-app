const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const user = req.user;

  // تحقق من وجود المستخدم
  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // تحقق من وجود الحقول المطلوبة
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newNote = await Note.create({
    title,
    content,
    category: category || null, // null لو مش موجود
    ownerId: user._id,
  });

  res.status(201).json({
    message: "Note created successfully 📝",
    note: newNote,
  });
});

module.exports = createNote;
