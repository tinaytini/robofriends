import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import SearchButton from '../components/SearchButton';
import './app.css';
import { setSearchField, requestRobots } from '../action';

class App extends Component {
       
    componentDidMount() {
       this.props.onRequestRobots()
    }


    render() {
        const { searchValue, handleClick, robots, isPending } = this.props;

        const searchFilter = robots.filter(robot => {
            if (robot.name !== undefined && searchValue !== undefined)    {
                return robot.name.toLowerCase().includes(searchValue.toLowerCase())
            }
            return false
        })

        return isPending ?
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
        searchValue: state.searchRobots.searchField,
        isPending: state.robotsReducer.isPending,
        robots: state.robotsReducer.robots,
        error: state.robotsReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
