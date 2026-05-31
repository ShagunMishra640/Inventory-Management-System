import { Routes, Route } from "react-router-dom";

import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";

const InventoryRoutes = () => {
  return (
    <Routes>
      <Route path="products" element={<Products />} />
      <Route path="add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default InventoryRoutes;
