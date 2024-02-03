import React, { useState } from 'react';
import NavBar from '../../components/NarBar/NavBar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    // Trigger the search when the "Go" button is pressed
    console.log(searchTerm);
    await fetchData();
  };

  // Function to fetch data from Flask API with the search term
  const fetchData = async () => {
    console.log(searchTerm);

    // Encode the search term to handle special characters
    const encodedTerm = encodeURIComponent(searchTerm);
    console.log(encodedTerm);

    const response = await fetch('http://localhost:5000/api/search?term=' + encodedTerm);

    const data = await response.json();

    setSearchResults(data);
    console.log(data);
  };

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
      {/* <ul>
        {searchResults.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Home;
