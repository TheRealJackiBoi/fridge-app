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

        const userVarer = database.ref('users/'+ user + '/varer')
        const newVarerKey = userVarer.push();

        newVarerKey.set({
            "barcode": "098023198",
            "name": "newItem",
            "amount": 4,
            "date": "4/4/21"
        });

    }
    

    //newItem
    const userItemsRef = database.ref('varer/');
    

    

    useEffect(() => {
        setVarer([]);

        userItemsRef.on('value', (snapshot) => {
          const items = snapshot.val();
          const key = snapshot.key;
          let itemsFormated = [];
          Object.values(items).forEach(item =>{
          const itemFormated = { 
                       key: key, 
                       date: item.date, 
                       name: item.name, 
                       amount: item.amount, 
                       picpath: "/images/" + item.barcode + ".jpg"
                    };
          itemsFormated.push(itemFormated);
        });
        console.log(itemsFormated, "value");
        setVarer(itemsFormated);
        });
        
    
    }, []);

    return (
        <div id="newItemMenu">
            <button id="close-newItemMenu" onClick={props.addHandler}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <div id="newitemDisplay">
                    <div id="searchbar-varer-div">
                        <input id="searchbar-varer" type="text" placeholder="Søg" ></input>
                    </div>
                <div id="itemDisplayIcon" >
                    {varer.map(item =>
                        <button key={item.name} className="item-display click" onClick={addItem}>
                            <img src={item.picpath} alt="" className="item-display-img"/>
                            <p className="item-display-name" >{item.name}</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}