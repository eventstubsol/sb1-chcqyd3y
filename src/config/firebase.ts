import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAiHJCku4A-XbWBhTrXgRzKFAHCy3IjkgY",
  authDomain: "eventstub-23ju90.firebaseapp.com",
  databaseURL: "https://eventstub-23ju90.firebaseio.com",
  projectId: "eventstub-23ju90",
  storageBucket: "eventstub-23ju90.appspot.com",
  messagingSenderId: "721205186325",
  appId: "1:721205186325:web:2a0b94ddfe8c7a0f1ae31c",
  measurementId: "G-0XNVBDSCZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;