import API from '../../api/axios';

export async function getStockReport(params) {
  return API.get('/reports/stock', { params });
}

export async function getLowStockReport(params) {
  return API.get('/reports/low-stock', { params });
}

export async function getPurchaseReport(params) {
  return API.get('/reports/purchases', { params });
}

export async function getSupplierReport(params) {
  return API.get('/reports/suppliers', { params });
}
