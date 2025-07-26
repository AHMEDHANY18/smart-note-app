let jwt = require("jsonwebtoken");

module.exports = (payload, expiresIn = "1y") => {
  if (!payload) {
    throw new Error("Payload is required");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
