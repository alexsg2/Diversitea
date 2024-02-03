import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NarBar/NavBar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    // Trigger the search when the "Go" button is pressed
    fetchData();
  };

  // Function to fetch data from Flask API with the search term
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/search?term=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when search term changes
    fetchData();
  }, [searchTerm]);

  return (
    <div>
      <NavBar />

      <h1>Welcome to the Home Page!</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* "Go" Button */}
      <button onClick={handleSearchButtonClick}>Go</button>

      {/* Display search results */}
      <ul>
        {searchResults.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
