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
    const [userKey, setUserKey] = useState("1");
    const [varer, setVarer] = useState([]);

    //the database variable recieved from props
    const database = props.database;
    
    //event handler for onClick of the add button of an item, recieves item as an parameter
    const addItem = item => {
        
        const userVarer = database.ref('users/'+ userKey + '/varer');
        
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

        const getUserKey = () => {
            const usersRef = props.database.ref('users/');
            usersRef.on('value', (snapshot) => {
              const users = snapshot.val();
              if(users) {
                let i = 0;
                Object.values(users).forEach(thisUser=>{
                  const key = Object.keys(users)[i];
                  if (thisUser.uid === props.user.uid) {
                    console.log(key);
                    setUserKey(key);
                    return ;
                  }
                  i++;
               });   
            } else {return {};}
          });
          }

          getUserKey();

        userItemsRef.on('value', (snapshot) => {
          const items = snapshot.val();
          let itemsFormated = [];
          let i = 0;
          Object.values(items).forEach(item =>{
            const key = Object.keys(items)[i];
            const itemFormated = { 
                        key: key, 
                        barcode: item.barcode,
                        date: item.date, 
                        name: item.name, 
                        amount: item.amount, 
                        picpath: "/images/" + item.barcode + ".jpg"
                        };
          i++;
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