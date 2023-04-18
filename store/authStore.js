import {
    Store,
    createAsyncAction,
    errorResult,
    successResult,
    registerInDevtools,
} from 'pullstate';

import {
    fb_getCurrentUser,
    fb_createUserWithEmailAndPassword,
    fb_signOut,
    fb_signInWithEmailAndPassword,
    fb_getIdToken,
} from '../firebase-service';

import userApi from '../api/user.api.js';

export const authStore = new Store({
    user: null,
    loggedIn: false,
});

export const getUserProfile = createAsyncAction(async () => {
    try {
        let { data: profile } = await userApi.getUserProfile();
        return successResult(profile);
    } catch (e) {
        return errorResult([], 'Could not get user profile');
    }
});

export const getFirebaseUser = createAsyncAction(
    async () => {
        let user = await fb_getCurrentUser();
        if (user.user) {
            return successResult(user);
        }
        return errorResult('No user');
    },
    {
        postActionHook: ({ result }) => {
            if (result.payload?.user) {
                authStore.update((s) => {
                    s.user = result.payload.user;
                    s.loggedIn = true;
                });
            } else {
                authStore.update((s) => {
                    s.user = null;
                    s.loggedIn = false;
                });
            }
        },
    }
);

export const registerWithEmailAndPassword = createAsyncAction(async ({ email, password, username }) => {
    try {
        // check api for username and email
        let { data: account} = await userApi.checkForAccount({ email, username })
        if (account.accountExists) {
            return errorResult([], account.message);
        }
        let user = await fb_createUserWithEmailAndPassword(email, password);
        getFirebaseUser.clearAllCache();
        await getFirebaseUser.run();
        await userApi.createAccount({ email, username });
        return successResult(user);
    } catch (e) {
        console.log(e);
        return errorResult([], "Registration failed");
    }
});

export const getIdToken = createAsyncAction(async () => {
    const token = await fb_getIdToken();
    if (token) {
        return successResult(token);
    }
    return errorResult([], 'No token');
});

export const signInWithEmailAndPassword = createAsyncAction(async ({ email, password }) => {
    try {
        const user = await fb_signInWithEmailAndPassword(email, password);
        getFirebaseUser.clearAllCache();
        await getFirebaseUser.run();
        return successResult(user);
    } catch (e) {
        return errorResult([], "Email or password is incorrect");
    }
});

export const signOutOfFirebase = createAsyncAction(async () => {
    await fb_signOut();
    getFirebaseUser.clearAllCache();
    await getFirebaseUser.run();
    return successResult();
});



registerInDevtools({
    authStore,
});

export default authStore;
