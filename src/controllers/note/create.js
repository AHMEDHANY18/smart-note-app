const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const user = req.user;

  const newNote = await Note.create({
    title,
    content,
    category: category || null,
    ownerId: user._id,
  });

  res.status(201).json({
    message: "Note created successfully 📝",
    note: newNote,
  });
});

module.exports = createNote;
