import { get, post, put, destroy } from './index.js';
module.exports = {
  getUser: () =>
    get('/api/v1/user'),
  createAccount : (data) =>
    post('/api/v1/user/create-account', data),
  checkForAccount: (data) =>
    get(`/api/v1/user/check-for-account?email=${data.email}&username=${data.username}`),
  uploadProfilePicture: (data) =>
    post('/api/v1/user/file/profile-picture', data),
  getUserProfile: () =>
    get('/api/v1/user/profile'),
  getProfilePicture: (name) =>
    get(`/api/v1/user/file${name}`),
  deleteFile: (file) =>
    destroy(`/api/v1/user/file${file}`),
}