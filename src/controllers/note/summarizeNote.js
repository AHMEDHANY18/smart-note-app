const openai = require("../../config/groq");
const {
  asyncHandler,
} = require("../../middlewares/authorization.middlewares/asyncHandler");
const { Note } = require("../../models");

const summarizeNoteController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const note = await Note.findOne({ _id: id, ownerId: user._id });
  if (!note) {
    return res.status(404).json({ message: "Note not found or unauthorized" });
  }

  const response = await openai.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes user notes.",
      },
      {
        role: "user",
        content: `Summarize this note in a short paragraph: ${note.content}`,
      },
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  const summary = response.choices[0].message.content;

  res.status(200).json({ summary });
});

module.exports = summarizeNoteController;
