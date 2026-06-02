import API from "../../api/axios";

export async function getAccessRules() {
  return API.get("/access");
}

export async function createAccessRule(data) {
  return API.post("/access", data);
}

export async function updateAccessRule(id, data) {
  return API.put(`/access/${id}`, data);
}

export async function deleteAccessRule(id) {
  return API.delete(`/access/${id}`);
}
