import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Billing from "../pages/Billing";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Products from "../pages/Products";
import Reports from "../pages/Reports"
import Settings from "../pages/Settings";

import CashierLayout from "../../layouts/CashierLayout";

function CashierRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CashierLayout />}>
        {/* Default Redirect */}
        <Route index element={<Navigate to="dashboard" />} />

        {/* Cashier Pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="billing" element={<Billing />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default CashierRoutes;
