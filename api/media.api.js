import { get, post, put, destroy } from './index.js';
module.exports = {
  searchMulti: (itemType, query) =>
    get(`/api/v1/media/search/${itemType}?query=${query}`),
  getDetails: (id, mediaType) =>
    get(`/api/v1/media/details/${mediaType}/${id}`),
}