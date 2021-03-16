import React from 'react';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ""
        }

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        const input = e.target.value;
        this.props.onInput(input);
    }
   

    render() {
        return(
            <div>
                <input id="searchbar-varer" onInput={this.handleInput} type="text" placeholder="Søg" ></input>
            </div>
        );
    }

    componentDidMount() {
        
    }
}