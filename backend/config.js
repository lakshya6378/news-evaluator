import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBCDxT6Fm2Q36FgHerVS7bvCBFVeDSa8FM",
    authDomain: "newsai-ed71c.firebaseapp.com",
    projectId: "newsai-ed71c",
    storageBucket: "newsai-ed71c.appspot.com",
    messagingSenderId: "831145441154",
    appId: "1:831145441154:web:7f509322e7f999a34b419b",
    measurementId: "G-WKTSFDZ1BC"
  };
  firebase.initializeApp(firebaseConfig)
  const db=firebase.fireStore()
  const User=db.collection("Users");
  module.exports=User;