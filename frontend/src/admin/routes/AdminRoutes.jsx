import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import Product from "../pages/Product";
import Order from "../pages/Order";
import Users from "../pages/Users";
import Report from "../pages/Report";
import Setting from "../pages/Setting";
import POSTerminal from "../pages/POSTerminal";
import AdminRegister from "../pages/AdminRegister";
import Unauthorized from "../pages/Unauthorized";
import Login from "../pages/Login";

import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<AdminRegister />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} />
        <Route path="users" element={<Users />} />
        <Route path="report" element={<Report />} />
        <Route path="terminal" element={<POSTerminal />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
