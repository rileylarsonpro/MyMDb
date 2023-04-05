import { get, post, put, destroy } from './index.js';

module.exports = {
    getUserTags: (body) =>
    get(`/api/v1/tag/user-tags`),
}