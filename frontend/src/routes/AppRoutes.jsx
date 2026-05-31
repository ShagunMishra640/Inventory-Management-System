import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";

import CashierRoutes from "../cashier/routes/CashierRoutes";
import AdminRoutes from "../admin/routes/AdminRoutes";
import { AdminAppProvider } from "../admin/context/AppContext";

function AppRoutes() {
  return (
    <Routes>

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Cashier routes */}
      <Route path="/cashier/*" element={<CashierRoutes />} />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <AdminAppProvider>
            <AdminRoutes />
          </AdminAppProvider>
        }
      />

      {/* Catch-all (optional but recommended) */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRoutes;