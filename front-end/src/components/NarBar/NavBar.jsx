import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from "lucide-react";

const NavBar = () => {
  const containerStyle = {
    borderRadius: "15px",
  };

  const navbarStyle = {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#E0D9F1",
    padding: "15px",
  };

  const defaultButtonStyle = {
    borderRadius: "15px",
    backgroundColor: "#E0D9F1",
    color: "#9384E3",
    border: "none",
  };

  const modalStyle = {
    display: "block",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const modalContentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
  };

  const [buttonStyles, setButtonStyles] = useState({
    home: defaultButtonStyle,
    advancedSearch: defaultButtonStyle,
    help: defaultButtonStyle,
    compare: defaultButtonStyle,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = (buttonKey) => {
    setButtonStyles({
      ...buttonStyles,
      [buttonKey]: {
        ...defaultButtonStyle,
        backgroundColor: "#9384E3",
        color: "#E0D9F1",
      },
    });
  };

  const handleMouseLeave = (buttonKey) => {
    setButtonStyles({
      ...buttonStyles,
      [buttonKey]: defaultButtonStyle,
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-4" style={containerStyle}>
      <div className="rounded p-3" style={navbarStyle}>
        <Link to="/">
          <button
            className="btn btn-primary"
            style={buttonStyles.home}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={() => handleMouseLeave('home')}
          >
            Home
          </button>
        </Link>
        <Link to="/adv-search">
          <button
            className="btn btn-primary"
            style={buttonStyles.advancedSearch}
            onMouseEnter={() => handleMouseEnter('advancedSearch')}
            onMouseLeave={() => handleMouseLeave('advancedSearch')}
          >
            Leader Board
          </button>
        </Link>
        <Link to="/compare">
          <button
            className="btn btn-primary"
            style={buttonStyles.compare}
            onMouseEnter={() => handleMouseEnter('compare')}
            onMouseLeave={() => handleMouseLeave('compare')}
          >
            Compare
          </button>
        </Link>
        <Link to="/about">
          <button
            className="btn btn-primary"
            style={{ ...defaultButtonStyle, ...buttonStyles.about }}
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={() => handleMouseLeave('about')}
          >
            About
          </button>
        </Link>
        <button
          className="btn btn-primary"
          onClick={openModal}
          style={{ ...defaultButtonStyle, ...buttonStyles.help }}
        >
          <Info style={{ color: "#9384E3" }} />
        </button>
        {isModalOpen && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h2>Infomation</h2>
              <hr />
              <h5>Discover Company Information:</h5>
              <p>Unlock in-depth details about any company by entering its name in the main page search bar. Explore information such as industry, financials, and more.</p>
              <hr />
              <h5>Company Comparison:</h5>
              <p>Effortlessly compare companies by selecting the company button in the navigation bar. Input the names of [Company1] and [Company2], replacing them with the actual company names, and receive a comprehensive side-by-side analysis.</p>
              <hr />
              <h5>Leaderboards:</h5>
              <p>Curious about top-performing companies? Navigate to the leaderboards section for a curated list of leading companies across various categories.</p>
              <hr />
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default NavBar;
