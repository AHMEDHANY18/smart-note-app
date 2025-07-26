// middlewares/checkRevoked.js

const { RevokedToken } = require("../../models");

const checkRevoked = async (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  const isRevoked = await RevokedToken.findOne({ token });
  if (isRevoked) {
    return res.status(401).json({ message: "Token is revoked" });
  }

  next();
};

module.exports = checkRevoked;
