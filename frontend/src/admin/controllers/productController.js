import API from "../../api/axios";

export async function getProducts(params) {
  return API.get("/products", { params });
}

export async function getProduct(id) {
  return API.get(`/products/${id}`);
}

export async function createProduct(data) {
  return API.post("/products", data);
}

export async function updateProduct(id, data) {
  return API.put(`/products/${id}`, data);
}

export async function deleteProduct(id) {
  return API.delete(`/products/${id}`);
}
