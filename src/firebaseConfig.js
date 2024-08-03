import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const config = initializeApp({
    apiKey: "AIzaSyCP80GB89LO5C1JfKGw32j42fE0g-mQYmE",
    authDomain: "fuchs-im-wald.firebaseapp.com",
    databaseURL: "https://fuchs-im-wald-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fuchs-im-wald",
    storageBucket: "fuchs-im-wald.appspot.com",
    messagingSenderId: "1076474812336",
    appId: "1:1076474812336:web:4987e7c06cffc8ae1ba875"
});

export const database = getFirestore(config);