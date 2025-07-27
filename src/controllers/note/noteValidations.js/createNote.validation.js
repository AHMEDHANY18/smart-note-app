const Joi = require("joi");

const createNoteValidation = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),
  content: Joi.string().trim().min(5).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must be at least 5 characters",
  }),
  category: Joi.string().optional(), // لو عايز تتأكد من IDs معينة نقدر نحط enum أو regex
});

module.exports = createNoteValidation;
