import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import logApi from '../api/log.api.js';



export const logEpisodes = createAsyncAction(async (body) => {
    try {
        let { data } = await logApi.logEpisodes(body);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Log episodes failed");
    }
});