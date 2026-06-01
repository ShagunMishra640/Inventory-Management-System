const jwt = require("jsonwebtoken");

const normalizeRole = (role) =>
  role ? String(role).toLowerCase().trim() : undefined;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: normalizeRole(user.role),
    },

    process.env.JWT_SECRET,

    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

module.exports = generateToken;
