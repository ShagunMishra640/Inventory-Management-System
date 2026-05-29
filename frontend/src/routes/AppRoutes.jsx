import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import CashierDashboard from "../cashier/Dashboard";
import ManagerDashboard from "../manager/Dashboard";

import Billing from "../cashier/pages/Billing";
import Orders from "../cashier/pages/Orders";
import Products from "../cashier/pages/Products";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= DEFAULT ROUTE ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= CASHIER DASHBOARD ================= */}
        <Route
          path="/cashier/dashboard"
          element={
            <ProtectedRoute>
              <CashierDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= BILLING PAGE ================= */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* ================= PRODUCTS PAGE ================= */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* ================= ORDERS PAGE ================= */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ================= MANAGER DASHBOARD ================= */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
