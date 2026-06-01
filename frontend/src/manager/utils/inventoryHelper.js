import {
  calculateStockValue,
  getProductStock,
  getProductStockStatus,
} from "./stockCalculator";

// Get Stock Status
export const getStockStatus = (quantity, minStock = 10) => {
  return getProductStockStatus({ stock: quantity, minStock });
};

// Total Inventory Value
export const calculateInventoryValue = (products = []) => {
  return calculateStockValue(products);
};

// Total Products Count
export const getTotalProducts = (products = []) => {
  return Array.isArray(products) ? products.length : 0;
};

// Low Stock Products Count
export const getLowStockCount = (products = [], minStock = 10) => {
  if (!Array.isArray(products)) return 0;

  return products.filter((product) => {
    const stock = getProductStock(product);
    return stock > 0 && stock <= minStock;
  }).length;
};

// Out Of Stock Count
export const getOutOfStockCount = (products = []) => {
  if (!Array.isArray(products)) return 0;

  return products.filter((product) => getProductStock(product) <= 0).length;
};
