import API from "../api/axios";

// REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// LOGIN USER
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
