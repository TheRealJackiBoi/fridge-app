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
