import API from "../../api/axios";

export const getCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await API.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await API.post("/categories/create", categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await API.put(`/categories/update/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/delete/${id}`);
  return response.data;
};

export const searchCategory = async (keyword) => {
  const response = await API.get("/categories");
  const categories = Array.isArray(response.data?.data) ? response.data.data : [];
  const query = keyword.trim().toLowerCase();

  return {
    ...response.data,
    data: query
      ? categories.filter((category) =>
          category.name?.toLowerCase().includes(query),
        )
      : categories,
  };
};
