// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyS1beBGb4yMkYu89_0r8sx_l3zDWLH5w",
  authDomain: "movie-app-96098.firebaseapp.com",
  projectId: "movie-app-96098",
  storageBucket: "movie-app-96098.appspot.com",
  messagingSenderId: "432569646771",
  appId: "1:432569646771:web:adc8a81faf3711af70fac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)