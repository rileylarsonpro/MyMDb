import { get, post, put, destroy } from './index.js';

module.exports = {
  logEpisode: (body) =>
    post(`/api/v1/log/episode`, body),
  logSeason: (body) =>
    post(`/api/v1/log/season`, body),
  logShow: (body) =>
    post(`/api/v1/log/show`, body),
  logMovie: (body) =>
    post(`/api/v1/log/movie`, body),
}