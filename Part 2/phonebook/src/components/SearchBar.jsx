import React from 'react';

const SearchBar = ({search, handleSearchChange}) => {
    return (
      <p>filter shown with <input value={search} onChange={handleSearchChange}></input></p>
    )
}

export default SearchBar;