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


const database = firebase.database();
const auth = firebase.auth();
const analytics = firebase.analytics();


export function App() {
  
  const [user] = useAuthState(auth);


    return(<div id="app">
      
      <NavBar user={user}/>
      <div id="main">
        {
        user 
        ? 
        <Profile user={1} database={database} /> 
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


function SignOut() {
  return auth.currentUser && (
      <li><button className="sign-out" onClick={() => auth.signOut()} >Sign Out</button></li>
    )
}

function Login() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    //check if there's a user with that uid in database, if not: create the user in database
    /*if (user.uid === null){
      console.log('error');
    }*/
  }

  return (
      <button className="sign-in" onClick={signInWithGoogle}>Login</button>
  )

}

function NavBar(props) {

  return(<div className="navBar">
          <ul>
            <li id="logo" >Dit Køleskab</li>
      
          {props.user ? <SignOut /> : <div><li><Login /></li></div>}
        </ul>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
