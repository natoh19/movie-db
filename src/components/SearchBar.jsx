import React from 'react';

export const SearchBar = ({handleSearch}) => {

    const handleChange = (e) => {
        let value = e.target.value;
        handleSearch(value);
    }

    return (
        <div className="search-wrapper">
            <input onChange={handleChange}
                placeholder="Search Movies"
                className="search-bar"/>
        </div>
    )
}

export default SearchBar;
