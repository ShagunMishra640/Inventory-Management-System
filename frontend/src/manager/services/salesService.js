import API from "../../api/axios";

const SALES_BASE = "/sales";

// Get All Sales
export const getSales = async () => {
  const response = await API.get(SALES_BASE);
  return response.data;
};

// Get Single Sale
export const getSaleById = async (id) => {
  const response = await API.get(`${SALES_BASE}/${id}`);
  return response.data;
};

// Create Sale
export const createSale = async (saleData) => {
  const response = await API.post(SALES_BASE, saleData);
  return response.data;
};

// Update Sale
export const updateSale = async (id, saleData) => {
  const response = await API.put(
    `${SALES_BASE}/${id}`,
    saleData
  );
  return response.data;
};

// Delete Sale
export const deleteSale = async (id) => {
  const response = await API.delete(
    `${SALES_BASE}/${id}`
  );
  return response.data;
};

// Sales Statistics
export const getSalesStats = async () => {
  const response = await API.get(
    `${SALES_BASE}/stats`
  );
  return response.data;
};

// Total Revenue
export const getTotalRevenue = async () => {
  const response = await API.get(
    `${SALES_BASE}/revenue`
  );
  return response.data;
};

// Monthly Sales
export const getMonthlySales = async () => {
  const response = await API.get(
    `${SALES_BASE}/monthly`
  );
  return response.data;
};

// Daily Sales
export const getDailySales = async () => {
  const response = await API.get(
    `${SALES_BASE}/daily`
  );
  return response.data;
};

// Top Selling Products
export const getTopSellingProducts =
  async () => {
    const response = await API.get(
      `${SALES_BASE}/top-products`
    );
    return response.data;
  };

// Sales By Category
export const getSalesByCategory =
  async () => {
    const response = await API.get(
      `${SALES_BASE}/category`
    );
    return response.data;
  };

// Recent Sales
export const getRecentSales =
  async () => {
    const response = await API.get(
      `${SALES_BASE}/recent`
    );
    return response.data;
  };

// Search Sales
export const searchSales = async (
  keyword
) => {
  const response = await API.get(
    `${SALES_BASE}/search/${keyword}`
  );
  return response.data;
};

// Export Sales Excel
export const exportSalesExcel =
  async () => {
    const response = await API.get(
      `${SALES_BASE}/export/excel`
    );
    return response.data;
  };

// Export Sales PDF
export const exportSalesPDF =
  async () => {
    const response = await API.get(
      `${SALES_BASE}/export/pdf`
    );
    return response.data;
  };
