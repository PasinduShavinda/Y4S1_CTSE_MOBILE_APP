import firebase from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyD1yBUSJQOeX-b-3WJkBZSJzHvUbo2sJ0A",
  authDomain: "ctse-mobile-app.firebaseapp.com",
  projectId: "ctse-mobile-app",
  storageBucket: "ctse-mobile-app.appspot.com",
  messagingSenderId: "652221257814",
  appId: "1:652221257814:web:286081defb23ba902983f7",
};

firebase.initializeApp(firebaseConfig)
export {firebase}