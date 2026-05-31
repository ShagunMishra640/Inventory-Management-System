import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import CashierRoutes from "../cashier/routes/CashierRoutes";
import AdminRoutes from "../admin/routes/AdminRoutes";
import { AdminAppProvider } from "../admin/context/AppContext";
import ManagerRoutes from "../manager/routes/ManagerRoutes";

function AppRoutes() {
  return (
    <Routes>

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

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

      {/* Manager routes */}
      <Route path="/manager/*" element={<ManagerRoutes />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
