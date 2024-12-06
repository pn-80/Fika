import React, { useState } from 'react';
import search from '../images/search.png';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div className="tm-hero d-flex justify-content-center align-items-center">
      <form className="d-flex tm-search-form" onSubmit={handleSearchSubmit}>
        <input
          className="form-control tm-search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-success tm-search-btn" type="submit">
          <img src={search} alt="Logo" style={{ height: '60%', width: 'auto' }} />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
