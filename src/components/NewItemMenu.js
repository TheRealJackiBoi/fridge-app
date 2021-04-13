import React from 'react';
import firebase from './../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';

export function NewItemMenu() {

    

    return (
        <div id="newItemMenu">
            <button id="extra-plus-button">
                <i class="fa fa-minus" aria-hidden="true"></i>
            </button>
            <div id="newitemDisplay">
                    <div id="searchbar-varer-div">
                        <input id="searchbar-varer" type="text" placeholder="Søg" ></input>
                    </div>
                <div id="itemDisplayIcon" >
                    
                </div>
            </div>
        </div>
    );
}