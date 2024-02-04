import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NarBar/NavBar';
import photo from '../../images/Diversitea.png'; // Replace with the actual path to your photo

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);  // State for auto-fill suggestions
  const [currentOption, setCurrentOption] = useState(0);  // State to track the current option
  const [typedOption, setTypedOption] = useState(''); // State to store the currently typed option
  const navigate = useNavigate();

  const options = ['Your Company', 'Your Business', 'Your Organization'];

  const typeOptions = async () => {
    for (let i = 0; i < options.length; i++) {
      setCurrentOption(i);
      await typeOption(options[i]);
      await eraseOption(options[i]);
    }
    typeOptions(); // Restart the typing effect loop
  };

  const typeOption = async (option) => {
    for (let j = 0; j <= option.length; j++) {
      setTypedOption(option.substring(0, j));
      await sleep(200); // Adjust the typing speed as needed
    }
  };

  const eraseOption = async (option) => {
    for (let k = option.length; k >= 0; k--) {
      setTypedOption(option.substring(0, k));
      await sleep(100); // Adjust the erasing speed as needed
    }
  };


  useEffect(() => {
    typeOptions();
  }, []); // Empty dependency array to run the effect only once on mount

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    setSuggestions(suggestions.companies);
  };

  const fetchData = async () => {
    const encodedTerm = encodeURIComponent(searchTerm);
    const response = await fetch('http://localhost:5000/api/search?term=' + encodedTerm);
    const data = await response.json();

    console.log(data);

    navigate('/company-result', { state: { data } });
  };

  return (
    <div className="container-fluid">
      <NavBar />

      <div className="row">
        {/* Photo Side */}
        <div className="col-md-6">
          <img src={photo} alt="Logo" className="img-fluid" />
        </div>

        {/* Search Side */}
        <div className="col-md-6 d-flex flex-column  justify-content-center mt-4 mb-4">
          <h1 className="display-5">Get the Tea about...</h1>

          <div className="mb-4">
            {typedOption ? (
              <h1 className="display-1" style={{ color: '#7145D9' }}>{typedOption}</h1>
            ) : (
              <h1 className="display-1" style={{ color: '#7145D9', visibility: 'hidden' }}>&nbsp;</h1>
            )}
          </div>


          <div className="d-flex">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              list="suggestions"
              style={{ width: '75%' }}
            />

            {/* Datalist for auto-fill suggestions */}
            <datalist id="suggestions">
              {suggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>

            {/* "Go" Button */}
            <button className="btn btn-primary" style={{ backgroundColor: '#7145D9' }} onClick={handleSearchButtonClick}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
