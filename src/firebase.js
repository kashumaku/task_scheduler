import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCSvNwk1KCcUlzQpS7mhFCA8Zf0jIMJYkU",
    authDomain: "task-scheduler-364f8.firebaseapp.com",
    projectId: "task-scheduler-364f8",
    storageBucket: "task-scheduler-364f8.appspot.com",
    messagingSenderId: "516188276606",
    appId: "1:516188276606:web:7fbc0e8f8499489eb7552f"
};

// Initialize Firebase
export const connection = initializeApp(firebaseConfig);
export const db = getFirestore(connection)