import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import CashierDashboard from "../cashier/Dashboard";
import ManagerDashboard from "../manager/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cashier/dashboard" element={<CashierDashboard />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
