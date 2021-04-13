import React, { useState, useEffect } from 'react';
import firebase from './../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import {} from 'react-firebase-hooks/auth';

export function NewItemMenu(props) {

    const [user, setUser] = useState(props.user);
    const [varer, setVarer] = useState([]);

    const database = props.database;
    
    const addItem = e => {
        console.log('item added to user');
    }
    

    //newItem
    const userItemsRef = database.ref('users/'+ user + '/varer');
    
    useEffect(() => {

    setVarer([]);

    userItemsRef.on('child_added', (snapshot, prevChildKey) => {
      const items = snapshot.val();
      const key = snapshot.key;
      let item = { key: key, date: items.date, name: items.name, amount: items.amount, picpath: "/images/" + key + ".jpg"};
      console.log(item, "added");
        setVarer([item].concat(varer));
    });
    console.log(varer, "varer");
    }, []);

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
                    {varer.map(item =>
                        <button key={item.key} className="item-display click" onClick={addItem}>
                            <img src={item.picpath} alt="" className="item-display-img"/>
                            <p className="item-display-name" >{item.name}</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}