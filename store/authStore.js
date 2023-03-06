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

export const authStore = new Store({
    user: null,
    loggedIn: false,
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

export const registerWithEmailAndPassword = createAsyncAction(async ({ email, password }) => {
    console.log('register');

    // check api for username and email
    // if exists, return error
    // else, create user
    const user = await fb_createUserWithEmailAndPassword(email, password);
    getFirebaseUser.clearAllCache();
    await getFirebaseUser.run();
    return successResult(user);
});

export const getIdToken = createAsyncAction(async () => {
    const token = await fb_getIdToken();
    console.log('gettingToken', token);
    if (token) {
        return successResult(token);
    }
    return errorResult('No token');
});

export const signInWithEmailAndPassword = createAsyncAction(async ({ email, password }) => {
    console.log('signIn');
    const user = await fb_signInWithEmailAndPassword(email, password);
    getFirebaseUser.clearAllCache();
    await getFirebaseUser.run();
    return successResult(user);
});

export const signOutOfFirebase = createAsyncAction(async () => {
    console.log('signOut');
    await fb_signOut();
    getFirebaseUser.clearAllCache();
    await getFirebaseUser.run();
    return successResult();
});

registerInDevtools({
    authStore,
});

export default authStore;
