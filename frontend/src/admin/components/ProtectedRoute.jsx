import { Navigate } from "react-router-dom";

const normalizeRole = (role) => {
  const normalized = String(role || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  if (normalized === "administrator" || normalized.includes("admin")) {
    return "admin";
  }

  if (normalized.includes("manager") || normalized.includes("inventory")) {
    return "inventory-manager";
  }

  if (normalized === "user" || normalized === "staff") {
    return "cashier";
  }

  return normalized;
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
};

const getRoleFromToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decodedPayload.role;
  } catch {
    return "";
  }
};

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = getStoredUser();
  const userRole = normalizeRole(user?.role || getRoleFromToken(token || ""));
  const normalizedAllowedRoles = allowedRoles?.map(normalizeRole);

  // STEP 1: NOT LOGGED IN
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // STEP 2: ROLE CHECK
  if (normalizedAllowedRoles && !normalizedAllowedRoles.includes(userRole)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
