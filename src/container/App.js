import React, { Component, useReducer } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchButton from '../components/SearchButton';
import './app.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchValue: ''
        }
        
    }
    
    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));   
    }


    handleClick = (event) => {
        this.setState({searchValue: event.target.value})
    }
   

    render() {
        const { robots, searchValue } = this.state;
        const searchFilter = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchValue.toLowerCase())
        })
        return !robots.length ?
        <h1>Loading...</h1> : 
        <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchButton onHandleClick={this.handleClick} />
        <Scroll>
            <CardList robotsList={searchFilter} />
        </Scroll>   
    </div>   
    }
}

export default App;
