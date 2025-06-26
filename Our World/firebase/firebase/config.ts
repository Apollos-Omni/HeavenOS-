import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC2zB0uRe_0G0QPr4wCY4mtFyQyJP-m6Bc",
  authDomain: "mphapp-68c15.firebaseapp.com",
  projectId: "mphapp-68c15",
  storageBucket: "mphapp-68c15.appspot.com",
  messagingSenderId: "482051717590",
  appId: "1:482051717590:android:b3004fc3f4c69c7099cc77"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
