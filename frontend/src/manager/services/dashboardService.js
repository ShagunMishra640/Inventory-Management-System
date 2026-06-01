import API from "../../api/axios";

export const getDashboardData = async () => {
  const response = await API.get("/manager/dashboard/reports");
  return response.data?.data || {};
};
