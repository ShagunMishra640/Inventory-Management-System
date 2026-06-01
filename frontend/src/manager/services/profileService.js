import API from "../../api/axios";

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data?.user || {};
};

export const updateProfile = async (profileData) => {
  const response = await API.put("/auth/profile", profileData);
  return response.data?.user || {};
};
