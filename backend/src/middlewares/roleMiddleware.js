const normalizeRole = (role) => {
  const normalized = role
    ? String(role).toLowerCase().trim().replace(/[\s_]+/g, "-")
    : "";

  if (normalized === "administrator") {
    return "admin";
  }

  if (
    normalized === "manager" ||
    normalized === "inventory" ||
    normalized === "sales-manager"
  ) {
    return "inventory-manager";
  }

  return normalized;
};

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
