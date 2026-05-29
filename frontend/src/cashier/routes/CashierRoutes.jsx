import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Billing from "../pages/Billing";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";

function CashierRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="dashboard" />} />

      {/* Pages (IMPORTANT: NO /cashier prefix) */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="billing" element={<Billing />} />
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
      <Route path="payments" element={<Payments />} />
    </Routes>
  );
}

export default CashierRoutes;
