import React from 'react';
import {SearchBar} from './SearchBar';

export class UserStorage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchinput: "",
        varer: []
      };

      this.onInput = this.onInput.bind(this); 
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
    return (
      <table>
        <tbody>
          <tr>
            <td className="image-display">
              <td className="plus-minus-btn"></td>
              <td className="plus-minus-btn"></td>
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