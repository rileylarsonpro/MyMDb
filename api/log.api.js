import { get, post, put, destroy } from './index.js';

module.exports = {
  logEpisode: (body) =>
    post(`/api/v1/log/episode`, body),
}