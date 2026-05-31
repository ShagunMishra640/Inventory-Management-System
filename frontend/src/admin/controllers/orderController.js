import API from "../../api/axios";

export async function getOrders(params) {
  return API.get("/orders", { params });
}

export async function getOrder(id) {
  return API.get(`/orders/${id}`);
}

export async function createOrder(data) {
  return API.post("/orders", data);
}

export async function updateOrder(id, data) {
  return API.put(`/orders/${id}`, data);
}

export async function deleteOrder(id) {
  return API.delete(`/orders/${id}`);
}
