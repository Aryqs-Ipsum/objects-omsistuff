import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1RwlkVE5Fk1IzuENTK2lk2MXaumBRZmc",
    authDomain: "objects-omsistuff.firebaseapp.com",
    databaseURL: "https://objects-omsistuff.firebaseio.com",
    projectId: "objects-omsistuff",
    storageBucket: "objects-omsistuff.appspot.com",
    messagingSenderId: "798024256030",
    appId: "1:798024256030:web:1be5e23fc368de067b3c0f"
}

firebase.initializeApp(firebaseConfig)

export {
    firebase
}