//firebase set up

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAG9vGLlOm6AmgwH2srZlUdfs70UhjAuo0",
    authDomain: "mexpensedemo.firebaseapp.com",
    projectId: "mexpensedemo",
    storageBucket: "mexpensedemo.appspot.com",
    messagingSenderId: "676244327010",
    appId: "1:676244327010:web:778879946b5578964edf3b",
    measurementId: "G-L7J7JM5RQV"
}

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();

export {firebase, db};