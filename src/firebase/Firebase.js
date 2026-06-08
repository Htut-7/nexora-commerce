import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCDSrRs98R0kfzYlgQ8qg900rJt0Vbobbc",
  authDomain: "nexora-4dd7b.firebaseapp.com",
  projectId: "nexora-4dd7b",
  storageBucket: "nexora-4dd7b.firebasestorage.app",
  messagingSenderId: "265033509005",
  appId: "1:265033509005:web:eb9d0ea08e7720e7ac5ac4",
  measurementId: "G-VT54FP861N"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const auth =getAuth(app);

export {db,auth}