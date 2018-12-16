import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyATkrviAhB5rCYZuD5Wevqwsns-yoD4-Is",
    authDomain: "nemsaassesment.firebaseapp.com",
    databaseURL: "https://nemsaassesment.firebaseio.com",
    projectId: "nemsaassesment",
    storageBucket: "nemsaassesment.appspot.com",
    messagingSenderId: "31052687738"
  };
  firebase.initializeApp(config);

  firebase.firestore().settings({timestampsInSnapshots: true})


  
  // ...
  
  // Stop listening for changes
  

export default firebase