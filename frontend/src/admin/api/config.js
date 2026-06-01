// Base backend URL. Vite proxies /api to the backend in development.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// API Endpoints
export const ENDPOINTS = {
  USERS: `${BASE_URL}/users`,
  PRODUCTS: `${BASE_URL}/products`,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  ADMIN_LOGIN: `${BASE_URL}/admin/login`,
  ADMIN_REGISTER: `${BASE_URL}/admin/register`,
  ORDERS: `${BASE_URL}/orders`,
  CART: `${BASE_URL}/cart`,
};
