import { Navigate } from "react-router-dom";

const normalizeRole = (role) => {
  const normalized = String(role || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  if (normalized === "manager" || normalized === "inventory") {
    return "inventory-manager";
  }

  return normalized;
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getTokenPayload = (token) => {
  try {
    const base64Url = token.split(".")[1];

    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
};

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    clearAuth();
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const tokenPayload = getTokenPayload(token);

  if (!tokenPayload || (tokenPayload.exp && tokenPayload.exp * 1000 <= Date.now())) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }

  const userRole = normalizeRole(user?.role || tokenPayload.role);

  if (
    allowedRoles &&
    !allowedRoles.map(normalizeRole).includes(userRole)
  ) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
