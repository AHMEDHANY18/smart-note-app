const Joi = require("joi");

const egyptianPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

const registerValidation = Joi.object({
  fullname: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": "Full name is required",
    "string.empty": "Full name cannot be empty",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  recoveryEmail: Joi.string().email().optional().allow("").messages({
    "string.email": "Please enter a valid recovery email",
  }),

  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 30 characters",
  }),

  phone: Joi.string().pattern(egyptianPhoneRegex).required().messages({
    "string.pattern.base": "Phone must be a valid Egyptian number",
    "any.required": "Phone number is required",
  }),
});

module.exports = registerValidation;
