import React, { Component } from 'react';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
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
                    <ErrorBoundary>
                        <CardList robotsList={searchFilter} />
                    </ErrorBoundary>
                </Scroll>   
            </div>   
    }
}

export default App;
