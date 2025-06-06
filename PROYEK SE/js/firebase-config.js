import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpYZUqEKu3K3CHgrbLb9WsHMxSd-zezCg",
  authDomain: "breath-6cfe4.firebaseapp.com",
  projectId: "breath-6cfe4",
  storageBucket: "breath-6cfe4.firebasestorage.app",
  messagingSenderId: "360596405730",
  appId: "1:360596405730:web:a948c6ee1ef0d3baef0dbb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
