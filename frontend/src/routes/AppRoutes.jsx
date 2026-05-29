import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";

import CashierRoutes from "../cashier/routes/CashierRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CASHIER */}
      <Route path="/cashier/*" element={<CashierRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
