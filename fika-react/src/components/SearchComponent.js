import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: { q: searchTerm }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Join Space</h2>
      <form onSubmit={handleSearch}>
        <input
          className="form-control search-input"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index}>{result.your_column_name}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
