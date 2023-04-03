import { get, post, put, destroy } from './index.js';

module.exports = {
  logEpisodes: (body) =>
    post(`/api/v1/log/episodes`, body),
}