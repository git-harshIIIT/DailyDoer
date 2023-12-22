// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import keys from './keys'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getDatabase} from 'firebase/database'
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:keys.firebase.API_KEY,
  authDomain: "dailydoer-c23f4.firebaseapp.com",
  databaseURL: "https://dailydoer-c23f4-default-rtdb.firebaseio.com",
  projectId: "dailydoer-c23f4",
  storageBucket: "dailydoer-c23f4.appspot.com",
  messagingSenderId: "856965846509",
  appId: "1:856965846509:web:2c97b98a44cd25a30643e4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();