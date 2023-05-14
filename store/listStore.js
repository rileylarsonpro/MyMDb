import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import listApi from '../api/list.api.js';



export const getUserLists = createAsyncAction(async () => {
    try {
        let { data } = await listApi.getUserLists();
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Get user lists failed");
    }
});

export const getList = createAsyncAction(async (id) => {
    try {
        let { data } = await listApi.getList(id);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Get list failed");
    }
})