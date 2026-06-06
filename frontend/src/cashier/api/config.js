// Cashier API endpoints matching backend route mounts
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const CASHIER_ENDPOINTS = {
  PRODUCTS: `${BASE_URL}/products`,
  CUSTOMERS: `${BASE_URL}/customer`,
  ORDERS: `${BASE_URL}/orders`,
  ORDER_CREATE: `${BASE_URL}/order/create`,
  PAYMENT_CREATE: `${BASE_URL}/payment/create`,
  RAZORPAY_QR_CREATE: `${BASE_URL}/payment/razorpay/qr`,
  PAYMENTS: `${BASE_URL}/payment`,
  CART: `${BASE_URL}/cart`,
  DISCOUNTS: `${BASE_URL}/discount`,
  REFUND_CREATE: `${BASE_URL}/refund/create`,
  CUSTOMER_CREATE: `${BASE_URL}/customer/create`,
  CUSTOMER_UPDATE: `${BASE_URL}/customer/update`,
  CUSTOMER_DELETE: `${BASE_URL}/customer/delete`,
};
