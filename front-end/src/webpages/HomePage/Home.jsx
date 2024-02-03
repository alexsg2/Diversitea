import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import NavBar from '../../components/NarBar/NavBar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

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

    console.log(data);

    // Navigate to the Company page with the search results
    navigate('/company-result', { state: { data } });
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
    </div>
  );
}

export default Home;
