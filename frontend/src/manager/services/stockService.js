import API from "../../api/axios";

const STOCK_BASE = "/stocks";

const normalizeProducts = (response) => {
  if (Array.isArray(response.data?.products)) return response.data.products;
  if (Array.isArray(response.data?.data)) return response.data.data;
  if (Array.isArray(response.data)) return response.data;
  return [];
};

export const getStocks = async () => {
  const response = await API.get(STOCK_BASE);
  return Array.isArray(response.data?.data) ? response.data.data : [];
};

export const createStock = async (stockData) => {
  const response = await API.post(STOCK_BASE, stockData);
  return response.data;
};

export const updateStock = async (id, stockData) => {
  const response = await API.put(`${STOCK_BASE}/${id}`, stockData);
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await API.delete(`${STOCK_BASE}/${id}`);
  return response.data;
};

export const getLowStockProducts = async () => {
  const response = await API.get("/products");
  const products = normalizeProducts(response);

  return products.filter((product) => {
    const stock = Number(product.stock ?? product.quantity ?? 0);
    const minStock = Number(product.minStock ?? product.reorderLevel ?? 10);
    return stock <= minStock;
  });
};

export const getStockReport = async () => {
  const response = await API.get("/products");
  const products = normalizeProducts(response);

  return {
    totalProducts: products.length,
    lowStockCount: products.filter((product) => {
      const stock = Number(product.stock ?? product.quantity ?? 0);
      const minStock = Number(product.minStock ?? product.reorderLevel ?? 10);
      return stock <= minStock;
    }).length,
    outOfStockCount: products.filter(
      (product) => Number(product.stock ?? product.quantity ?? 0) <= 0,
    ).length,
  };
};
