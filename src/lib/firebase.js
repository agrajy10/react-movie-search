import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCROmPLE1u4LVj9H7_aNWBMfQ0nSasExio",
  authDomain: "movie-search-4a236.firebaseapp.com",
  projectId: "movie-search-4a236",
  storageBucket: "movie-search-4a236.appspot.com",
  messagingSenderId: "179045358431",
  appId: "1:179045358431:web:e745e21efff57b0820f4ea",
};

const firebseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();

export { firebseApp, firebaseAuth };
