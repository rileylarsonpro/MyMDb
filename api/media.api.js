import { get, post, put, destroy } from './index.js';
module.exports = {
  searchMulti: (query) =>
    get(`/api/v1/media/search/multi?query=${query}`),
  getDetails: (id, mediaType) =>
    get(`/api/v1/media/details/${mediaType}/${id}`),
}