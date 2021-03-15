import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var database = firebase.database();

var user = database.ref('users/1');

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      advanced_words: []
    }
  }
}



const hello = 'hello';

class UserTD extends React.Component {
  get user () {
    user.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    const theUser = data;
    
    return {name: theUser.name, email: theUser.email, password: theUser.password}; 
  });
};

render() {
  const data = this.user;

  return (
    <tr>
    <td>{data.name}</td>
    <td>{data.email}</td>
    <td>{data.password}</td>
    </tr>
  );
  }}

function App() { 
  console.log(firebase.database().ref('users/').key);

 


const body = (<body>
  <h1>{hello}</h1>
  <table>
    <tr>
      <th>Name</th>  
      <th>Email</th>  
      <th>Password</th>  
    </tr>
    <tbody>
      <UserTD />
    </tbody> 
  </table>
  </body>   
  ); 



  return (body);

};


    
export default App;
