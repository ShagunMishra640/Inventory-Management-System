import API from '../../api/axios';

export async function getSalesReport(params) {
  return API.get('/reports/sales', { params });
}

export async function getInventoryReport(params) {
  return API.get('/reports/inventory', { params });
}

export async function getRevenueSummary(params) {
  return API.get('/reports/revenue', { params });
}
