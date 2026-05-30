import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";

import CashierRoutes from "../cashier/routes/CashierRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/cashier/*" element={<CashierRoutes />} />
    </Routes>
  );
}

export default AppRoutes;
