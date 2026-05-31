import API from "../../api/axios";

export const getEmployees = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await API.post("/users", employeeData);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await API.put(`/users/${id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};
