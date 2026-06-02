import API from "../../api/axios";

export async function getTaxSettings() {
  return API.get("/tax-settings");
}

export async function updateTaxSettings(data) {
  return API.put("/tax-settings", data);
}
