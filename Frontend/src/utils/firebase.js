import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "talentai-3bada.firebaseapp.com",
  projectId: "talentai-3bada",
  storageBucket: "talentai-3bada.firebasestorage.app",
  messagingSenderId: "881087767494",
  appId: "1:881087767494:web:649bd865f5902ead5008c7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
