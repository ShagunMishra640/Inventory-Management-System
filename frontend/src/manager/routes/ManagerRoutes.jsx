import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Orders from "../pages/Orders";
import Reports from "../pages/Reports";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Inventory from "../pages/Inventory";
import Sales from "../pages/Sales";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";
import LowStock from "../pages/LowStock";
import PurchaseOrders from "../pages/PurchaseOrders";
import StockManagement from "../pages/StockManagement";
import Suppliers from "../pages/Suppliers";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="employees" element={<Employees />} />
      <Route path="products" element={<Products />} />
      <Route path="products/add" element={<AddProduct />} />
      <Route path="products/edit" element={<EditProduct />} />
      <Route path="categories" element={<Categories />} />
      <Route path="orders" element={<Orders />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="stock" element={<StockManagement />} />
      <Route path="low-stock" element={<LowStock />} />
      <Route path="purchase-orders" element={<PurchaseOrders />} />
      <Route path="suppliers" element={<Suppliers />} />
      <Route path="sales" element={<Sales />} />
      <Route path="reports" element={<Reports />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="settings" element={<Settings />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default ManagerRoutes;
