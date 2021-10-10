import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASEAPI,
    authDomain: "bflixdot.firebaseapp.com",
    projectId: "bflixdot",
    storageBucket: "bflixdot.appspot.com",
    messagingSenderId: "294107236550",
    appId: "1:294107236550:web:949b7ff3eea700b7842fc7",
    measurementId: "G-VYTXNCYYR6"
  };

  const app = firebase.initializeApp(firebaseConfig)
  const auth = app.auth()
  const db = app.firestore()


  export { auth }
  export default db; 