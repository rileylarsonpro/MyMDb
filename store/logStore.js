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

export const logSeason = createAsyncAction(async (body) => {
    try {
        let { data } = await logApi.logSeason(body);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Log season failed");
    }
})

export const logShow = createAsyncAction(async (body) => {
    try {
        let { data } = await logApi.logShow(body);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Log show failed");
    }
})

export const logMovie = createAsyncAction(async (body) => {
    try {
        let { data } = await logApi.logMovie(body);
        return successResult(data);
    } catch (e) {
        console.log(e);
        return errorResult([], "Log movie failed");
    }
})

