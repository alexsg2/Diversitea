import React, { useState, useEffect } from 'react'; // Import useEffect along with useState
import NavBar from '../../components/NarBar/NavBar';

function Adv() {

  const [type, setType] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const handleClick = async (category) => {
    setSelectedCategory(category); // Update selectedCategory based on which button is clicked

    setLoading(true);
    try {
      // Fetch data for both companies
      const response1 = await fetch('http://localhost:5000/api/advancedstats?stat=' + category);
      const data1 = await response1.json();
      setCompanies(data1.sorted_data);
      setType(category);
      setSelectedCategory(category);

    } catch (error) {
      console.error('Failed to fetch company data:', error);
      alert('Failed to fetch data for one or both companies.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate the current companies to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = companies ? companies.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Safe check for companies before rendering pagination
  const totalPages = companies ? Math.ceil(companies.length / itemsPerPage) : 0;
  const paginationControls = totalPages > 1 && [...Array(totalPages).keys()].map(number => (
    <button key={number} onClick={() => paginate(number + 1)} style={pageButtonStyle}>
      {number + 1}
    </button>
  ));


  useEffect(() => {
    // Update the type and companies based on selectedCategory
    // if (selectedCategory === 'Female') {
    //   setType('Female');
    //   // setCompanies(femaleData.sorted_data);
    // }
    // else if (selectedCategory == "Male") {
    //   setType("Male");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "American Indian or Alaskan Native") {
    //   setType("American Indian or Alaskan Native");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Asain") {
    //   setType("Asian");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Black or African American") {
    //   setType("Black or African American");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Hispanic or Latino") {
    //   setType("Hispanic or Latino");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Native Hawaiian or Pacific Islander") {
    //   setType("Native Hawaiian or Pacific Islander");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Two or more races") {
    //   setType("Two or more races");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "White") {
    //   setType("White");
    //   // setCompanies(maleData.sorted_data);
    // }
    // else if (selectedCategory == "Rating") {
    //   setType("Rating");
    //   // setCompanies(maleData.sorted_data);
    // }
    setType(selectedCategory)

    // Add conditions for other categories as needed
  }, [selectedCategory]);


  return (
    <div className="container">
      <NavBar />
      <div style={{ margin: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {['Female', 'Male', 'American Indian or Alaskan Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Pacific Islander', 'Two or more races', 'White', 'Rating'].map((category, index) => (
          <button key={index} style={buttonStyle} onClick={() => handleClick(category)}>
            {category}
          </button>
        ))}
      </div>

      {type && companies && (
        <div style={{ margin: 'auto', textAlign: 'center', border: '20px', borderColor: 'purple' }}>
          <h2 style={{ margin: "45px" }}>Top Companies for {type} Employee Percentage</h2>
          <div style={{ width: '40%', margin: 'auto', alignItems: 'center' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Company Name</th>
                  {type === "Rating" ? <th>Rating</th> : <th>Percentage</th>}
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{company.Company}</td>
                    {type === "Rating" ? <td>{company[`${type}`]}</td> : <td>{company[`${type}`]}%</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={paginationStyle}>
            {paginationControls}
          </div>
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
  backgroundColor: '#7145D9',
  padding: '5px',
  textAlign: 'center',
  cursor: 'pointer', // Changes the cursor on hover to indicate the element is clickable
  borderRadius: "15px",
  color: "white",
  border: "none",
};

const tableStyle = {
  width: '100%',
  textAlign: 'center',
  margin: '5px',
  border: '20px',
  borderColor: 'purple',
  display: 'block', // Set display to block
  marginLeft: 'auto', // Auto margin from left
  marginRight: 'auto', // Auto margin from right
};


const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
};

const pageButtonStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  borderRadius: "15px",
  color: "white",
  border: "none",
  backgroundColor: '#7145D9',
};


export default Adv;
