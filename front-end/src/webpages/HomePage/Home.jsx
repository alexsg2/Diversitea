import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NarBar/NavBar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);  // State for auto-fill suggestions
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const inputTerm = e.target.value;
    setSearchTerm(inputTerm);

    // Fetch auto-fill suggestions based on the input
    fetchSuggestions(inputTerm);
  };

  const handleSearchButtonClick = async () => {
    console.log(searchTerm);
    await fetchData();
  };

  const fetchSuggestions = async (inputTerm) => {
    // Fetch suggestions based on the input
    // You can replace this with your own API call or data fetching logic
    const suggestionsData = await fetch('http://localhost:5000/api/suggestions?term=' + inputTerm);
    const suggestions = await suggestionsData.json();
    setSuggestions(suggestions.companies)
  };

  const fetchData = async () => {
    const encodedTerm = encodeURIComponent(searchTerm);
    const response = await fetch('http://localhost:5000/api/search?term=' + encodedTerm);
    const data = await response.json();

    console.log(data);

    navigate('/company-result', { state: { data } });
  };

  return (
    <div>
      <NavBar />
      <h1>Welcome to the Home Page!</h1>

      {/* Search Bar with auto-fill suggestions */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        list="suggestions"  // Link to the datalist
      />

      {/* Datalist for auto-fill suggestions */}
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>

      {/* "Go" Button */}
      <button onClick={handleSearchButtonClick}>Go</button>
    </div>
  );
}

export default Home;
