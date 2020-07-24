import React, { Component } from 'react';
import CardList from './CardList';
import { robots } from './robots-list'; 
import SearchButton from './SearchButton';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchValue: ''
        }
    }
    

    handleClick = (event) => {
        this.setState({searchValue: event.target.value})
    }
   

    render() {
        const searchFilter = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })

        return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchButton onHandleClick={this.handleClick} />
                <CardList robotsList={searchFilter} />
            </div>
        )
    }
}

export default App;
