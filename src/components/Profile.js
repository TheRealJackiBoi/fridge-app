import React from 'react';
import {UserStorage} from './UserTD';


export class Profile extends React.Component {
    
    render() {
        
        return(
            <div id="profile">
                <p id="hello-user">Hej <b>{this.props.user.displayName}</b></p>
                    <UserStorage user={this.props.user} database={this.props.database}/>
            </div>
        );
    }
}