import API from "../../api/axios";

// Get All Orders
export const getOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};

// Get Single Order
export const getOrderById = async (id) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};

// Create Order
export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

// Update Order
export const updateOrder = async (id, orderData) => {
  const response = await API.put(`/orders/${id}`, orderData);
  return response.data;
};

// Delete Order
export const deleteOrder = async (id) => {
  try {
    const response = await API.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    if ([404, 405].includes(error.response?.status)) {
      const response = await API.delete(`/orders/delete/${id}`);
      return response.data;
    }

    throw error;
  }
};
