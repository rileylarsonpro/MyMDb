import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import mediaApi from '../api/media.api.js';



export const searchMulti = createAsyncAction(async ({ query, itemType }) => {
    try {
        let { data } = await mediaApi.searchMulti(itemType, query);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Media search failed");
    }
});

export const getDetails = createAsyncAction(async ({ id, mediaType }) => {
    try {
        let { data } = await mediaApi.getDetails(id, mediaType);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Media details failed");
    }
});