import API from "../../api/axios";

// Get All Products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// Get Single Product
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

// Add Product
export const createProduct = async (productData) => {
  const response = await API.post("/products", productData);
  return response.data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
