import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
    apiKey: "AIzaSyCZXhm3zcG9vYBUhqKicIHKrcf1teHS4uM",
    authDomain: "okularnicy-app.firebaseapp.com",
    databaseURL: "https://okularnicy-app.firebaseio.com",
    projectId: "okularnicy-app",
    storageBucket: "okularnicy-app.appspot.com",
    messagingSenderId: "91894787110",
    appId: "1:91894787110:web:51e75bb16c6c56a0b5cae7",
    measurementId: "G-TQ02ZKRZB4"
  };
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
