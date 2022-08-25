import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: process.argv.API_KEY,
    authDomain: "fridge-24d33.firebaseapp.com",
    databaseURL: "https://fridge-24d33-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fridge-24d33",
    storageBucket: "fridge-24d33.appspot.com",
    messagingSenderId: "1051514148760",
    appId: "1:1051514148760:web:fe230c5a88c40031977ded",
    measurementId: "G-HDE0B77LE3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;
