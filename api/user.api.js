import { get, post, put, destroy } from './index.js';
module.exports = {
  getUser: () =>
    get('/api/v1/auth/user', {credentials: 'include'}),
  createAccount : (data) =>
    post('/api/v1/auth/create-account', data),
  login: (data) =>
    put('/api/v1/auth/local/login', data),
}