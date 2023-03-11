import { Capacitor } from "@capacitor/core";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  TwitterAuthProvider,
  signInWithPhoneNumber as signInWithPhoneNumberWeb,
} from "firebase/auth";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

// Initialize Firebase - information is stored in .env file in the root directory
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let USER = {value: false};
export const APP = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (Capacitor.isNativePlatform()) {
  // require to work appropriately on native devices
  initializeAuth(APP, {
    persistence: indexedDBLocalPersistence,
  });
}

export let currentUser = USER.value ? USER.value : null;


/******************************************************************************
 *
 * user by social media auth functions to set user after credential login
 *
 * @param user
 * @returns
 */
export const setCurrentUser = (user) => {
  USER.value = user?.auth ? user?.auth.currentUser : user;
  return currentUser;
};

export const newGetUser = () => {
  return new Promise(function (resolve) {
    // set user using js sdk auth state change user, we need to ensure
    // this user is logged in since we plan on using the database
    getAuth().onAuthStateChanged(async (user) => {
      USER.value = getAuth().currentUser;
      resolve(currentUser);
    });
  });
};

export const fb_signOut = async () => {
  const auth = getAuth();

  // sign out web
  await auth.signOut();

  // sign out capacitor
  await FirebaseAuthentication.signOut();

  USER.value = null;
};

export const fb_signInWithGoogle = async () => {
  const result = await FirebaseAuthentication.signInWithGoogle()
  const credential = GoogleAuthProvider.credential(result.credential?.idToken);
  await signInWithCredential(getAuth(), credential);
  USER.value = getAuth().currentUser;
  return currentUser;
};

export const fb_signInWithEmailAndPassword = async (
  email,
  password
) => {
  await signInWithEmailAndPassword(getAuth(), email, password);
  await FirebaseAuthentication.signInWithEmailAndPassword({email, password});
  USER.value = getAuth().currentUser;
  return currentUser;
};

export const fb_createUserWithEmailAndPassword = async (
  email,
  password
) => {
  const result = await FirebaseAuthentication.createUserWithEmailAndPassword({email, password});
  return result.user;
}
  
export const fb_getIdToken = async () => {
  try {
    const result = await FirebaseAuthentication.getIdToken();
    return result.token;
  } catch (e) {
    console.log(e);
    return '';
  }
}

export const fb_getCurrentUser = async () => {
  await newGetUser();
  const result = await FirebaseAuthentication.getCurrentUser();
  return result;
}
