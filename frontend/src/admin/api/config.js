// Base backend URL. Vite proxies /api to the backend in development.
export const BASE_URL = "/api";

// API Endpoints
export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PRODUCTS: `${BASE_URL}/products`,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  ORDERS: `${BASE_URL}/orders`,
  CART: `${BASE_URL}/cart`,
};
