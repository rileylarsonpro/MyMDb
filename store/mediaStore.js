import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import mediaApi from '../api/media.api.js';



export const searchMulti = createAsyncAction(async ({ query }) => {
    try {
        let { data } = await mediaApi.searchMulti(query);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Media search failed");
    }
});