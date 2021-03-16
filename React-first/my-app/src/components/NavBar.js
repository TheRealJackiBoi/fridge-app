import React from 'react';

export class NavBar extends React.Component {
    render() {
        return(
        <div className="navBar">
            <ul>
            <li id="logo"><a href="#">Dit Køleskab</a></li>
            
            {this.props.loginStatus === true ? <li><a href="#">Logud</a></li> : <div><li><a href="#">Login</a></li> <li><a href="#">signup</a></li></div>}
            </ul>
        </div>
        );
    };
}
