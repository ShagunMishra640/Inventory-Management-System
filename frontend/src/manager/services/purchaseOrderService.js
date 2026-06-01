import API from "../../api/axios";

const PURCHASE_ORDER_BASE = "/purchase-orders";

const normalizePurchaseOrders = (response) =>
  Array.isArray(response.data?.data) ? response.data.data : [];

export const getPurchaseOrders = async () => {
  const response = await API.get(PURCHASE_ORDER_BASE);
  return normalizePurchaseOrders(response);
};

export const createPurchaseOrder = async (orderData) => {
  const response = await API.post(PURCHASE_ORDER_BASE, orderData);
  return response.data;
};

export const updatePurchaseOrder = async (id, orderData) => {
  const response = await API.put(`${PURCHASE_ORDER_BASE}/${id}`, orderData);
  return response.data;
};

export const deletePurchaseOrder = async (id) => {
  const response = await API.delete(`${PURCHASE_ORDER_BASE}/${id}`);
  return response.data;
};
