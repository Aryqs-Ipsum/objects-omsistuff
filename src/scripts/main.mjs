// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getFirestore, collection, query, getDocs, where } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js';

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

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        report: '',
        objects: [],

        isValidReport() {
            return this.report.length > 0 && this.report.match(/Sceneryobjects\\.+\\.+\.sco/g)
        },

        paths() {
            let buffer = [];
            this.report.split('\n').forEach(line => {
                if (line.match(/Sceneryobjects\\.+\\.+\.sco/g)) {
                    const text = line.replace(/Sceneryobjects\\(.+)\\.+\.sco/g, '$1');
                    if(!buffer.includes(text))
                        buffer.push(text);
                }
            });
            return buffer;
        },

        async fetchDb() {
            let buffer = [];
            const q = query(collection(db, "objects"), where('path', 'in', this.paths()));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                buffer.push({id: doc.id, ...doc.data()});
            });

            this.objects = buffer;

            console.log(this.objects, buffer);
        }
    }));
});