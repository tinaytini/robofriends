import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import SearchButton from '../components/SearchButton';
import './app.css';
import { setSearchField } from '../action';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: []
        }
        
    }
    
    componentDidMount() {
        console.log(this.props.store)
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots:users}));   
    }


    render() {
        const { robots } = this.state;
        const { searchValue, handleClick } = this.props;

        const searchFilter = robots.filter(robot => {
            if (robot.name !== undefined && searchValue !== undefined)    {
                return robot.name.toLowerCase().includes(searchValue.toLowerCase())
            }
            return false
        })

        return !robots.length ?
            <h1>Loading...</h1> : 
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchButton onHandleClick={handleClick} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robotsList={searchFilter} />
                    </ErrorBoundary>
                </Scroll>   
            </div>   
    }
}

const mapStateToProps = state => {
    return {
        searchValue: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => dispatch(setSearchField(event.target.value))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
