import React from 'react';
import firebase from './../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import {} from 'react-firebase-hooks/auth';

export function NewItemMenu(props) {


    return (
        <div id="newItemMenu">
            <button id="close-newItemMenu" onClick={props.addHandler}>
                <i class="fa fa-minus" aria-hidden="true"></i>
            </button>
            <div id="newitemDisplay">
                    <div id="searchbar-varer-div">
                        <input id="searchbar-varer" type="text" placeholder="Søg" ></input>
                    </div>
                <div id="itemDisplayIcon" >
                    <div className="item-display">
                        <img src="#" alt="" className="item-display-img"/>
                        <p className="item-display-name" ></p>
                    </div>
                </div>
            </div>
        </div>
    );
}