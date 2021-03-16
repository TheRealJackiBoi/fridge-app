import React from 'react';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        this.props.onLogout();
    }

    render() {
        return(
        <div className="navBar">
            <ul>
            <li id="logo">Dit Køleskab</li>
            
            {this.props.loginStatus === true ? <li onClick={this.handleLogout}>Logud</li> : <div><li>Login</li> <li>Signup</li></div>}
            </ul>
        </div>
        );
    };
}
