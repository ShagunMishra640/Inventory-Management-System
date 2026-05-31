import API from '../../api/axios';

export async function getInventory(params) {
  return API.get('/inventory', { params });
}

export async function adjustStock(id, data) {
  return API.post(`/inventory/${id}/adjust`, data);
}

export async function getLowStock(params) {
  return API.get('/inventory/low-stock', { params });
}
