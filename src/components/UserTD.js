import React from 'react';
import { NewItemMenu } from './NewItemMenu';
import {SearchBar} from './SearchBar';

export class UserStorage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchinput: "",
        varer: [],
        remove: "false",
        add: "true"
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

    componentDidMount() {
      const userItemsRef = this.props.database.ref('users/'+ this.props.user + '/varer');
      userItemsRef.on('child_added', (snapshot, prevChildKey) => {
        const items = snapshot.val();
        console.log(items);
        const key = snapshot.key;
        let item = { date: snapshot.val().date, name: snapshot.val().name, amount: snapshot.val().amount, picpath: "/images/" + key + ".jpg"};
          this.setState({varer: [item].concat(this.state.varer)});
      });
    
    }
  
  render() {
    if (this.state.remove === 'true') {
      return (
        <table>
        <tbody>
          <tr>
            <td className="image-display">
              <td className="plus-minus-btn click">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </td>
              <td id="remove-item" className="plus-minus-btn click" onClick={this.removeHandler} style= {{ backgroundColor:  '#e95959'}} >
                <i class="fa fa-minus" aria-hidden="true"></i>
              </td>
            </td>
            <td className="searchbar-varer-td"><SearchBar onInput={this.onInput} /></td>
            </tr>
          <tr>
            <th></th>
            <th className="image-display" ></th>
            <th className="varenavn">Varenavn</th>  
            <th className="ud-dato" >Ud-Dato</th>  
            <th className="amount" >Antal</th>  
          </tr>
            { this.state.varer.map(item => 
              <tr>
                <td className="remove-button click"><i class="fa fa-minus" aria-hidden="true"></i></td>
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
        { this.state.add === "true" ? <NewItemMenu user={this.props.user} database={this.props.database} addHandler={this.addHandler} /> : ""}
        <tbody>
          <tr>
            <td className="image-display">
              <td className="plus-minus-btn click"> 
                <button id="plus-button" onClick={this.addHandler}>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </td>
              <td id="remove-item" className="plus-minus-btn click" onClick={this.removeHandler}>
                <i class="fa fa-minus" aria-hidden="true"></i>
              </td>
            </td>
            <td className="searchbar-varer-td"><SearchBar onInput={this.onInput} /></td>
            </tr>
          <tr>
            <th className="image-display" ></th>
            <th className="varenavn">Varenavn</th>  
            <th className="ud-dato" >Ud-Dato</th>  
            <th className="amount" >Antal</th>  
          </tr>
        { this.state.varer.map(item => 
        <tr>
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