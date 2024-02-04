import React, { useState, useEffect } from 'react'; // Import useEffect along with useState
import NavBar from '../../components/NarBar/NavBar';
// import femaleData from './female.json';
// import maleData from './male.json';

function Adv() {

  const [type, setType] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);


  const handleClick = async (category) => {
    console.log(`Category selected: ${category}`);
    setSelectedCategory(category); // Update selectedCategory based on which button is clicked

    setLoading(true);
        try {
            // Fetch data for both companies
            const response1 = await fetch('http://localhost:5000/api/search?stat=' + category);
            const data1 = await response1.json();
            setCompanies(data1.sorted_data);

        } catch (error) {
            console.error('Failed to fetch company data:', error);
            alert('Failed to fetch data for one or both companies.');
        } finally {
            setLoading(false);
        }
  };

  useEffect(() => {
    // Update the type and companies based on selectedCategory
    if (selectedCategory === 'Female') {
      setType('Female');
      // setCompanies(femaleData.sorted_data);
    }
    else if (selectedCategory == "Male") {
      setType("Male");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "American Indian or Alaskan Native") {
      setType("American Indian or Alaskan Native");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "Asain") {
      setType("Asian");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "Black or African American") {
      setType("Black or African American");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "Hispanic or Latino") {
      setType("Hispanic or Latino");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "Native Hawaiian or Pacific Islander") {
      setType("Native Hawaiian or Pacific Islander");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "Two or more races") {
      setType("Two or more races");
      // setCompanies(maleData.sorted_data);
    }
    else if (selectedCategory == "White") {
      setType("White");
      // setCompanies(maleData.sorted_data);
    }

    
    
    // Add conditions for other categories as needed
  }, [selectedCategory]);


  return (
    <div>
      <NavBar/>
      <h1>Leader Board</h1>
      <div style={{ 
          margin: '20px 0', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '10px', // This creates space between buttons without affecting their width
      }}>
        {/* Apply a consistent width and margin to each button */}
        <button style={buttonStyle} onClick={() => handleClick('Female')}>Female</button>
        <button style={buttonStyle} onClick={() => handleClick('Male')}>Male</button>
        <button style={buttonStyle} onClick={() => handleClick('American Indian or Alaskan Native')}>American Indian or Alaskan Native</button>
        <button style={buttonStyle} onClick={() => handleClick('Asian')}>Asian</button>
        <button style={buttonStyle} onClick={() => handleClick('Black or African American')}>Black or African American</button>
        <button style={buttonStyle} onClick={() => handleClick('Hispanic or Latino')}>Hispanic or Latino</button>
        <button style={buttonStyle} onClick={() => handleClick('Native Hawaiian or Pacific Islander')}>Native Hawaiian or Pacific Islander</button>
        <button style={buttonStyle} onClick={() => handleClick('Two or more races')}>Two or more races</button>
        <button style={buttonStyle} onClick={() => handleClick('White')}>White</button>
      </div>

      {type && companies && (
        <div>
          <h2>Top Companies for {type} Employee Percentage</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{company.Company}</td>
                  <td>{company['Male (%)'] ?? company['Female (%)']}%</td> {/* Adjust based on category */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

// Style object for the buttons
const buttonStyle = {
  width: '100px',
  height: '50px',
  margin: '5px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  border: '1px solid #ccc',
  backgroundColor: '#f9f9f9',
  padding: '5px',
  textAlign: 'center',
  cursor: 'pointer', // Changes the cursor on hover to indicate the element is clickable
};

const tableStyle = { width: '100%', textAlign: 'center' };


export default Adv;
