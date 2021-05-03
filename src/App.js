import React from 'react';
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


auth.onAuthStateChanged(user => {
  if (user) {
    if (user != null) {    
    //path for user in db
    const usersRef = database.ref('users/');
    let inDb = false;
    //gets users
    usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
       Object.values(users).forEach(checkingUser => {
        //checks for uid in db
        if (user.uid === checkingUser.uid) {
          inDb = true;
        }
      });
      //if user isn't in db, push user
      if (inDb === false) {
        usersRef.push().set({
          "uid": user.uid,
          "name": user.displayName,
          "email": user.email,
          "varer": {}
        });
        console.log('user added');
      }
    })   
      
}}});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
