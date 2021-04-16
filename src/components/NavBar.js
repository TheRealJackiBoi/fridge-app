import React, { useRef, useState } from 'react';
import {Login, SignOut} from './Login';

export function NavBar(props) {

    return(<div className="navBar">
            <ul>
              <li id="logo" >Dit Køleskab</li>
        
            {props.user ? <SignOut user={props.user} auth={props.auth}/> : <div><li><Login user={props.user} auth={props.auth}  /></li></div>}
          </ul>
      </div>
    );
  }
  