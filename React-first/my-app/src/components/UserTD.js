import React from 'react';

export class UserStorage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        varer: []
      };
    }
  
    componentDidMount() {
      const userItemsRef = this.props.database.ref('users/'+ this.props.user + '/varer');
      userItemsRef.on('child_added', (snapshot) => {
        const items = snapshot.val();
        console.log(items);
        let item = { date: snapshot.val().date, name: snapshot.val().name, amount: snapshot.val().amount, picpath: snapshot.val().picpath};
        this.setState({varer: [item].concat(this.state.varer)});
      });
    
    }
  
  render() {
  
    return (
      <table>
        <tbody>
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