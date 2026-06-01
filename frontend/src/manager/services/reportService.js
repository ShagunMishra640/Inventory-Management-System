import API from "../../api/axios";

const REPORT_BASE = "/reports";

const requestReport = async (path) => {
  const response = await API.get(`${REPORT_BASE}${path}`);
  return response.data;
};

export const getStockReport = () => requestReport("/stock");

export const getLowStockReport = () => requestReport("/low-stock");

export const getPurchaseReport = () => requestReport("/purchases");

export const getSupplierReport = () => requestReport("/suppliers");

export const getReports = async () => {
  const [stock, lowStock, purchases, suppliers] = await Promise.allSettled([
    getStockReport(),
    getLowStockReport(),
    getPurchaseReport(),
    getSupplierReport(),
  ]);

  return {
    stock: stock.status === "fulfilled" ? stock.value : null,
    lowStock: lowStock.status === "fulfilled" ? lowStock.value : null,
    purchases: purchases.status === "fulfilled" ? purchases.value : null,
    suppliers: suppliers.status === "fulfilled" ? suppliers.value : null,
    errors: [stock, lowStock, purchases, suppliers]
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason?.message || "Report request failed"),
  };
};

export const getReportStats = async () => {
  const reports = await getReports();

  return {
    totalProducts: reports.stock?.totalProducts || 0,
    totalLowStock: reports.lowStock?.totalLowStock || 0,
    totalPurchases: reports.purchases?.totalPurchases || 0,
    totalSuppliers: reports.suppliers?.totalSuppliers || 0,
  };
};

export const exportExcelReport = () => getReports();

export const exportPDFReport = () => getReports();
