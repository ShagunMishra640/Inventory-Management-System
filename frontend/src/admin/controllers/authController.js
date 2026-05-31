import API from '../../api/axios';

export async function login(credentials) {
  return API.post('/auth/login', credentials);
}

export async function logout() {
  return API.post('/auth/logout');
}

export async function getProfile() {
  return API.get('/auth/profile');
}
