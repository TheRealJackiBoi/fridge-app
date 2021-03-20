import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './App.css';
import './Search.css';
import firebase from './firebase.js'
import {NavBar} from './components/NavBar';
import {Profile} from './components/Profile';

var database = firebase.database();
class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: true,
      user: null
    };

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.setState({
      loginStatus: false,
      user: null
    });
  }

  render() {
    return(<div>
      
      <NavBar loginStatus={this.state.loginStatus} onLogout={this.onLogout} />
      
      {this.state.loginStatus === true ? <Profile user={1} database={database} /> : <div></div> }
      
      <img id="fridge-image" src={"/images/Fridge-sticker-final.png"} alt="Fridge Logo" />
    </div> );
  }
}

ReactDOM.render(
  (
      <App />
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
