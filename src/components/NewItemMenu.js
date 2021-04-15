import React, { useState, useEffect } from 'react';
import firebase from './../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import {} from 'react-firebase-hooks/auth';

// mini button component, so that it is possible to give the event handler the item object to process and add to user
const Button = props => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.item);
        }
    }
    return (
    <button onClick={handleClick} className="item-display click"> 
        <img src={props.item.picpath} alt="" className="item-display-img"/>
        <p className="item-display-name" >{props.item.name}</p>
    </button>)
}

// the component for choosing a new item to your fridge and adding it
export function NewItemMenu(props) {

    //states for the component
    const [user, setUser] = useState(props.user);
    const [varer, setVarer] = useState([]);

    //the database variable recieved from props
    const database = props.database;
    
    //event handler for onClick of the add button of an item, recieves item as an parameter
    const addItem = item => {
        
        const userVarer = database.ref('users/'+ user + '/varer')
        
        userVarer.push().set({
            "barcode": item.barcode,
            "name": item.name,
            "amount": item.amount,
            "date": item.date
        });
        
        console.log('item added to user');
    }
    

    //newItem
    const userItemsRef = database.ref('varer/');  

    //useEffect so that the page listens for values of varer from the database
    useEffect(() => {
        setVarer([]);

        userItemsRef.on('value', (snapshot) => {
          const items = snapshot.val();
          const key = snapshot.key;
          let itemsFormated = [];
          Object.values(items).forEach(item =>{
          const itemFormated = { 
                       key: key, 
                       barcode: item.barcode,
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
            {/* button to close the menu */}
            <button id="close-newItemMenu" onClick={props.addHandler}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            {/* the main part of the menu */}
            <div id="newitemDisplay">
                {/* the search bar */}
                    <div id="searchbar-varer-div">
                        <input id="searchbar-varer" type="text" placeholder="Søg" ></input>
                    </div>
                {/* the display of items using the Button component from earlier */}
                <div id="itemDisplayIcon" >
                    {varer.map(item =>
                        <Button key={item.name} item={item} onClick={addItem} />
                    )}
                </div>
            </div>
        </div>
    );
}