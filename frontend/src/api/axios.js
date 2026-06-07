import axios from "axios";

const API_BASE_URL = "https://inventory-management-system-b06g.onrender.com/api";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
