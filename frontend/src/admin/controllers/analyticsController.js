import API from "../../api/axios";

export async function getBusinessAnalytics() {
  return API.get("/analytics");
}
