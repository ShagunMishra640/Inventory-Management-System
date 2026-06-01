const normalizeRole = (role) =>
  role ? String(role).toLowerCase().trim() : "";

const authorizeRoles = (...roles) => {
  const normalizedRoles = roles.map(normalizeRole);

  return (req, res, next) => {
    const userRole = normalizeRole(req.user?.role);

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};
module.exports = authorizeRoles;
