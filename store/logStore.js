import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';


import logApi from '../api/log.api.js';



export const logEpisode = createAsyncAction(async (body) => {
    try {
        let { data } = await logApi.logEpisode(body);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Log episodes failed");
    }
});