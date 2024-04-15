
import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBKkFboxnf-ffl0P8GfyrXwEWB96qNqJro",
    authDomain: "projekt-5fbc7.firebaseapp.com",
    projectId: "projekt-5fbc7",
    storageBucket: "projekt-5fbc7.appspot.com",
    messagingSenderId: "855506406097",
    appId: "1:855506406097:web:d4f1f354340b8aa74013f0",
    measurementId: "G-5QLVQTVT47"
};
const app = initializeApp(firebaseConfig);
export default app