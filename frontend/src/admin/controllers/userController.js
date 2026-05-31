import API from '../../api/axios';

export async function getUsers(params) {
  return API.get('/users', { params });
}

export async function getUser(id) {
  return API.get(`/users/${id}`);
}

export async function createUser(data) {
  return API.post('/users', data);
}

export async function updateUser(id, data) {
  return API.put(`/users/${id}`, data);
}

export async function deleteUser(id) {
  return API.delete(`/users/${id}`);
}
