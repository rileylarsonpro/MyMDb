import { get, post, put, destroy } from './index.js';

module.exports = {
    getUserLists: () =>
        get(`/api/v1/list/user-lists`),
    getList: (id) =>
        get(`/api/v1/list/${id}`),
    createCustomList: (body) =>
        post(`/api/v1/list/custom`, body),
    updateCustomList: (id, body) =>
        put(`/api/v1/list/custom/${id}`, body),
    deleteList: (id) =>
        destroy(`/api/v1/list/${id}`),
    updateFavoritesList: (listType, body) =>
        put(`/api/v1/list/favorite/${listType}`, body),
}