import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import './index.css';
import './App.css';
import './Search.css';

import firebase from './firebase.js'
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';

import {Profile} from './components/Profile';
import {Welcome} from './components/Welcome';
import {NavBar} from './components/NavBar';



const database = firebase.database();
const auth = firebase.auth();


export function App() {
  
  const [user] = useAuthState(auth);
  

    return(<div id="app">
      
      <NavBar user={user} auth={auth} />
      <div id="main">
        
        {
        user 
        ? 
        <Profile user={user} database={database} /> 
        : 
        <Welcome/> 
        }

        <div id="fridge-image-container">
          <img id="fridge-image" src={"/images/Fridge-sticker-final.png"} alt="Fridge Logo" />
        </div>
      
      </div>
    </div> );
  }

ReactDOM.render(
  (
      <App />
  ),
  document.getElementById('root')
);


const checkUserInDb = (user) => {
  const userRef = database.ref('users/');
  if (user !== null) {
    userRef.on('value', (snapshot) => {
      const users = snapshot.val();
      Object.values(users).forEach(checkingUser =>{
        if (user.uid === checkingUser.uid) {
          return true;
        }
    });
      return false;
    })
  }
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    if (checkUserInDb === false) {  
      const userRef = database.ref('users/');      
      userRef.push().set({
        "key": "",
        "uid": user.uid,
        "name": user.displayName,
        "varer": {}
      });
      userRef.on('value', (snapshot) => {
        const users = snapshot.val();
        let i = 0;
        Object.values(users).forEach(thisUser => {
          const key = Object.keys(users)[i];
          if (thisUser.uid === user.uid) {
            database.ref('users/' + key + '/').update({"key": key});
          }
    })
  })
}}});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
