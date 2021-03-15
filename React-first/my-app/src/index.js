import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import firebase from './firebase.js'


var database = firebase.database();

var userPath = database.ref('users/1');


class UserStorageTD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      varer: []
    };
  }

  componentDidMount() {
    const userItemsRef = database.ref('users/'+ this.props.user + '/varer');
    userItemsRef.on('child_added', (snapshot) => {
      const items = snapshot.val();
      console.log(items);
      let item = { date: snapshot.val().date, name: snapshot.val().name, amount: snapshot.val().amount };
      this.setState({varer: [item].concat(this.state.varer)});
    });
  
  }

render() {

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Varenavn</th>  
          <th>Ud-Dato</th>  
          <th>Antal</th>  
        </tr>
      { this.state.varer.map(item => 
      <tr>
        <td></td>
        <td>{item.name}</td>
        <td>{item.date}</td>
        <td>{item.amount}</td>
      </tr>)
      }
      </tbody>
    </table>
  );}
}




ReactDOM.render(
  (
    <div>
      <h1>Hello</h1>
        <UserStorageTD user={1}/> 
    </div>   
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
