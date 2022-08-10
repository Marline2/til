import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY3jxA6jvoFtPCLH5CghRupBWR1Tjrwpk",
  authDomain: "authex-e23c2.firebaseapp.com",
  projectId: "authex-e23c2",
  storageBucket: "authex-e23c2.appspot.com",
  messagingSenderId: "690545477554",
  appId: "1:690545477554:web:ce9e198bb7476a8ac286ab",
  measurementId: "G-EVBJ5PKWSE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
export const storage = getStorage(app);
export const db = getFirestore(app);