// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import Alpine from "alpinejs";

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

Alpine.data('app', () => ({
    report: '',
    objects: [],
    helpDialogOpen: false,

    isValidReport() {
        return this.report.length > 0 && this.report.match(/Sceneryobjects\\.+\\.+\.sco/g)
    },

    getColorFromName(name) {
        const nbColors = 3;
        const base = '--color-';

        // recover number between 1 and nbColors
        let colorNumber = name.length
        while (colorNumber > nbColors) {
            colorNumber = colorNumber - nbColors;
        }

        return `${base}${colorNumber}`;
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

    pasted() {
        setTimeout(() => { 
            if(this.isValidReport()) {
                this.fetchDb();
                document.querySelector('#step-3').scrollIntoView();
            }
        }, 250);
    },

    async fetchDb() {
        this.objects = [];

        // check if query has less than 10 paths
        const paths = this.paths();

        // split paths in chunks of 10
        const chunks = [];
        for (let i = 0; i < paths.length; i += 10) {
            chunks.push(paths.slice(i, i + 10));
        }

        // fetch all chunks
        chunks.forEach(async chunk => {
            const q = query(collection(db, "objects"), where('path', 'in', chunk));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                this.objects.push({id: doc.id, ...doc.data()});
            });
        });
    }
}));

Alpine.start();
