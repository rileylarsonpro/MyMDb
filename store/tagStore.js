import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import tagApi from '../api/tag.api.js';



export const getUserTags = createAsyncAction(async () => {
    try {
        let { data } = await tagApi.getUserTags();
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Get user tags failed");
    }
});