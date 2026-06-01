const jwt = require("jsonwebtoken");
const User = require("../models/auth/userModel");

const normalizeRole = (role) =>
  role ? String(role).toLowerCase().trim() : undefined;

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mysecretkey",
      );

      let role = normalizeRole(decoded.role);

      if (!role && decoded.id) {
        const user = await User.findById(decoded.id).select("role");
        role = normalizeRole(user?.role);
      }

      req.user = {
        ...decoded,
        role,
      };

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;
