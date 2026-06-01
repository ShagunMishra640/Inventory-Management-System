import API from "../../api/axios";

const API_URL = "/suppliers";

// Get All Suppliers
export const getSuppliers = async () => {
  const response = await API.get(API_URL);
  return response.data;
};

// Get Single Supplier
export const getSupplierById = async (id) => {
  const response = await API.get(`${API_URL}/${id}`);
  return response.data;
};

// Add Supplier
export const createSupplier = async (supplierData) => {
  const response = await API.post(
    API_URL,
    supplierData
  );
  return response.data;
};

// Update Supplier
export const updateSupplier = async (
  id,
  supplierData
) => {
  const response = await API.put(
    `${API_URL}/${id}`,
    supplierData
  );
  return response.data;
};

// Delete Supplier
export const deleteSupplier = async (id) => {
  const response = await API.delete(
    `${API_URL}/${id}`
  );
  return response.data;
};
