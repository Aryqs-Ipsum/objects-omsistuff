// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getFirestore, collection, query } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1RwlkVE5Fk1IzuENTK2lk2MXaumBRZmc",
    authDomain: "objects-omsistuff.firebaseapp.com",
    databaseURL: "https://objects-omsistuff.firebaseio.com",
    projectId: "objects-omsistuff",
    storageBucket: "objects-omsistuff.appspot.com",
    messagingSenderId: "798024256030",
    appId: "1:798024256030:web:1be5e23fc368de067b3c0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);