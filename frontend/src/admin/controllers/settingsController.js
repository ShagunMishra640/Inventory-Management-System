import API from "../../api/axios";

export async function getSettings() {
  return API.get("/settings");
}

export async function updateSettings(data) {
  return API.put("/settings", data);
}
