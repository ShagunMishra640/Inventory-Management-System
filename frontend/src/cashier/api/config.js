// Cashier API endpoints matching backend route mounts
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const CASHIER_ENDPOINTS = {
  PRODUCTS: `${BASE_URL}/products`,
  CUSTOMERS: `${BASE_URL}/customer`,
  ORDERS: `${BASE_URL}/orders`,
  ORDER_CREATE: `${BASE_URL}/order/create`,
  PAYMENT_CREATE: `${BASE_URL}/payment/create`,
  PAYMENTS: `${BASE_URL}/payment`,
  CART: `${BASE_URL}/cart`,
};
