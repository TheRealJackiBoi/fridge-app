import React, { useState, useEffect } from 'react';
import firebase from './../firebase'
import 'firebase/auth';
import 'firebase/analytics';
import {} from 'react-firebase-hooks/auth';


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

export function NewItemMenu(props) {

    const [user, setUser] = useState(props.user);
    const [varer, setVarer] = useState([]);

    const database = props.database;
    
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
            <button id="close-newItemMenu" onClick={props.addHandler}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <div id="newitemDisplay">
                    <div id="searchbar-varer-div">
                        <input id="searchbar-varer" type="text" placeholder="Søg" ></input>
                    </div>
                <div id="itemDisplayIcon" >
                    {varer.map(item =>
                        <Button key={item.name} item={item} onClick={addItem} />
                    )}
                </div>
            </div>
        </div>
    );
}