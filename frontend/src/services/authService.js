import API from "../api/axios";

const getAuthErrorMessage = (error) => {
  const data = error.response?.data;

  if (error.response?.status === 502) {
    return "Backend API is not running. Start the backend server and try again.";
  }

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

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const response = await API.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
};
