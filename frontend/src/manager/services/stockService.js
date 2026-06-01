import API from "../../api/axios";

const normalizeStockResponse = (response) =>
  Array.isArray(response.data?.data) ? response.data.data : [];

export const getStocks = async () => {
  const response = await API.get("/stocks");
  return normalizeStockResponse(response);
};

export const createStock = async (stockData) => {
  const response = await API.post("/stocks", stockData);
  return response.data;
};

export const updateStock = async (id, stockData) => {
  const response = await API.put(`/stocks/${id}`, stockData);
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await API.delete(`/stocks/${id}`);
  return response.data;
};

export const getLowStockProducts = async () => {
  const response = await API.get("/reports/low-stock");
  return Array.isArray(response.data?.lowStockProducts)
    ? response.data.lowStockProducts
    : [];
};

export const getStockReport = async () => {
  const response = await API.get("/reports/stock");
  return response.data;
};
