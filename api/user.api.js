import { get, post, put, destroy } from './index.js';
module.exports = {
  getUser: () =>
    get('/api/v1/user'),
  createAccount : (data) =>
    post('/api/v1/user/create-account', data),
  checkForAccount: (data) =>
    get(`/api/v1/user/check-for-account?email=${data.email}&username=${data.username}`),
}