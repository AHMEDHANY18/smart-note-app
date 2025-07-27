module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true, // لو فيه بيانات زيادة مش هتوقف
      stripUnknown: true, // يشيل الحقول الغير معرفة في Joi schema
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }

    req.body = value; // نحدّث البيانات بعد التنظيف
    next();
  };
};
