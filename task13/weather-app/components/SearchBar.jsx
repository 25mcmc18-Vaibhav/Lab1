import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  // We moved the input state here!
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Send the finalized city name back to the parent (App.js)
      onSearch(inputValue); 
      // Clear the input box
      setInputValue(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Enter city name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;