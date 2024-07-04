// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5Yh35hRj0L8sVxljlPB7emnLMnecrtb0",
  authDomain: "duck1-f7176.firebaseapp.com",
  databaseURL: "https://duck1-f7176-default-rtdb.firebaseio.com",
  projectId: "duck1-f7176",
  storageBucket: "duck1-f7176.appspot.com",
  messagingSenderId: "833704703232",
  appId: "1:833704703232:web:86ba129d612fc09ddfefe5",
  measurementId: "G-L91T48Z6TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export {db};