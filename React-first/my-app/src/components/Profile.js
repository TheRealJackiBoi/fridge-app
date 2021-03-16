import React from 'react';
import {UserStorage} from './UserTD';

export class Profile extends React.Component {
    
    render() {
        return(
            <UserStorage user={this.props.user} database={this.props.database}/>
        );
    }
}