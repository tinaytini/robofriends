import React from 'react';

const SearchButton = ({searchValue,onHandleClick}) => {
    return (
        <input className="pa3 ba b--green bg-lightest-blue ma2"
            type="search" 
            placeholder="Search robots"
            value={searchValue}
            onChange={onHandleClick}
        />
    )
}
    

export default SearchButton;