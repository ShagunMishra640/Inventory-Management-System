import API from "../api/axios";

const getAuthErrorMessage = (error) => {
  const data = error.response?.data;

  if (data?.message) {
    return data.message;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors[0].msg || "Request failed";
  }

  return error.message || "Request failed";
};

// REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};

// LOGIN USER
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};
