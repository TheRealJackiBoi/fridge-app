import React from 'react';
import { NewItemMenu } from './NewItemMenu';
import {SearchBar} from './SearchBar';


// mini button component, so that it is possible to give the event handler the item object to process 
// and remove item from user
const Button = props => {
  const handleClick = () => {
      if (props.onClick) {
          props.onClick(props.item);
      }
  }
  return (
  <button onClick={handleClick} className="plus-minus-btn click"> 
      <i class="fa fa-minus" aria-hidden="true"></i>
  </button>)
}


export class UserStorage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchinput: "",
        varer: [],
        remove: "false",
        add: "false",
        userKey: ""
      };

      this.onInput = this.onInput.bind(this); 
      this.removeHandler = this.removeHandler.bind(this); 
      this.addHandler = this.addHandler.bind(this); 
  
    }
    //work in progress
    onInput(input) {
        this.setState({searchinput: input});
        const oldVarer = this.state.varer;
        this.setState({varer: []});
        oldVarer.forEach(item => {
          if(item.name.includes(this.state.searchinput)) {
            this.setState({varer: [item].concat(this.state.varer)});
          }
        });
    }
    
    removeHandler() {
      if (this.state.remove === "true") {
        this.setState({remove: "false"})
        console.log('false ' + this.state.remove)
      } else {
        this.setState({remove: "true"});
        console.log('true ' + this.state.remove)
      }
    }

    addHandler() {
      if (this.state.add === "true") {
        this.setState({add: "false"})
        console.log('false ' + this.state.add)
      } else {
        this.setState({add: "true"});
        console.log('true ' + this.state.add)
      }
    }
    getUserKey() {
      const usersRef = this.props.database.ref('users/');
      usersRef.on('value', (snapshot) => {
        const users = snapshot.val();
        if(users) {
          let i = 0;
          Object.values(users).forEach(thisUser=>{
            const key = Object.keys(users)[i];
            if (thisUser.uid === this.props.user.uid) {
              this.setState({userKey: key});

              const userItemsRef = this.props.database.ref('users/'+ key + '/varer');
                userItemsRef.on('value', (snapshot) => {
                  const items = snapshot.val();
                  if(items) {
                    let itemsFormated = [];
                    let i = 0;
                    Object.values(items).forEach(item=>{
                      const key = Object.keys(items)[i];
                      let itemFormated = { 
                        key: key, 
                        date: item.date, 
                        name: item.name, 
                        amount: item.amount, 
                        picpath: "/images/" + item.barcode + ".jpg"
                      };
                      i++;
                      itemsFormated.push(itemFormated)
                  });   
                  this.setState({varer: itemsFormated});
                }});
            }
            i++;
         });   
      }
    });
    }

    //removeItem eventhandler
    removeItem = item => {
      
      const userVarer = this.props.database.ref('users/'+ this.state.userKey + '/varer/' + item.key)
      
      userVarer.remove();
      
      console.log(item.key, ' removed from user: ', this.state.userKey);
  }

    //Runs when components mounts to the dom
    componentDidMount() {
      //loads from firebase made with inspisration from https://www.robinwieruch.de/react-firebase-realtime-database 
      //newItem
      const userItemsRef = this.props.database.ref('users/'+ this.state.userKey + '/varer');
      this.setState({varer: []});
      this.getUserKey();

      
      
      //removeItem
      userItemsRef.on('child_removed', (snapshot) => {
        const items = snapshot.val();
        const key = snapshot.key;
        let item = { key: key, date: items.date, name: items.name, amount: items.amount, picpath: "/images/" + items.barcode + ".jpg"};
        let index = this.state.varer.indexOf(item);
        if (~index) {
          this.setState(state => {
            const list = this.state.varer.filter(index);
            return list;
          });
        }
      });

      //changedItem
      //https://duckduckgo.com/?q=how+to+replace+an+item+in+array+js+with+out+knowing+index&ia=web&iax=qa
      // userItemsRef.on('child_changed', (snapshot) => {
      //   const items = snapshot.val();
      //   console.log(items, "changed");

      //   const key = snapshot.key;
      //   let item = { key: key, date: items.date, name: items.name, amount: items.amount, picpath: "/images/" + items.barcode + ".jpg"};
      //   this.setState(state => 
      //     {
      //       const newItems = this.state.varer.map((i, key, item) => {
      //         if (i.key === key) {
      //           return item;
      //         } else {
      //           return i;
      //         }
      //       })
      //       return newItems;
      //     });
      // });
    
    }
  
  render() {
    if (this.state.remove === 'true') {
      return (
        <table>
        <tbody>
          {/* top row + - Search */}
          <tr>
            {/* + - */}
            <td className="image-display">
              {/* - */}
              <div id="remove-item" className="plus-minus-btn click" onClick={this.removeHandler} style= {{ backgroundColor:  '#e95959'}} >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </div>
            </td>
            {/* Search */}
            <td className="searchbar-varer-td"><SearchBar onInput={this.onInput} /></td>
            </tr>
          {/* row of headers for table */}
          <tr>
            <th></th>
            <th className="image-display" ></th>
            <th className="varenavn">Varenavn</th>  
            <th className="ud-dato" >Ud-Dato</th>  
            <th className="amount" >Antal</th>  
          </tr>
          {/* Rows of items */}
            { this.state.varer.map(item => 
              <tr key={item.key}>
                <td className="remove-button click">
                  <Button className="" key={item.key} item={item} onClick={this.removeItem}/>
                  </td>
                <td className="image-display" >
                  <img src={item.picpath} alt={item.picpath}/>
                </td>
                <td>{item.name}</td>
                <td className="ud-dato" >{item.date}</td>
                <td className="amount">{item.amount}</td>
              </tr>)
            }
        </tbody>
      </table>
      )
    }
    return (
      <table>
        { this.state.add === "true" ? <NewItemMenu user={this.props.user} database={this.props.database} addHandler={this.addHandler} /> : <thead></thead>}
        <tbody>
           {/* top row + - Search */}
          <tr>
            {/* + - */}
            <td className="image-display">
              {/* + */}
              <div className="plus-minus-btn click"> 
                <button id="plus-button" onClick={this.addHandler}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
              {/* - */}
              <div id="remove-item" className="plus-minus-btn click" onClick={this.removeHandler}>
                <i className="fa fa-minus" aria-hidden="true"></i>
              </div>
            </td>
              {/* Search */}
              <td className="searchbar-varer-td"><SearchBar onInput={this.onInput} /></td>
            </tr>
            {/* row of headers for table */}
          <tr>
            <th className="image-display" ></th>
            <th className="varenavn">Varenavn</th>  
            <th className="ud-dato" >Ud-Dato</th>  
            <th className="amount" >Antal</th>  
          </tr>
          {/* Rows of items */}
          { this.state.varer.map(item => 
          <tr key={item.key}>
            <td className="image-display" >
              <img src={item.picpath} alt={item.picpath}/>
            </td>
            <td>{item.name}</td>
            <td className="ud-dato" >{item.date}</td>
            <td className="amount">{item.amount}</td>
          </tr>)
          }
        </tbody>
      </table>
    );}
  }