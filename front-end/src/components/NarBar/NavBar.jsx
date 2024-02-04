import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from "../../images/NavLogo.png";
import { Info } from "lucide-react"

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
    backgroundColor: "#E0D9F1", // Text color
    color: "#9384E3", // Button background color
    border: "none", // Remove border
  };

  const [buttonStyles, setButtonStyles] = useState({
    home: defaultButtonStyle,
    advancedSearch: defaultButtonStyle,
    help: defaultButtonStyle,
    compare: defaultButtonStyle,
  });

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
<<<<<<< HEAD
        <Link to="/help">
          <button
            className="btn btn-primary"
            style={buttonStyles.help}
            onMouseEnter={() => handleMouseEnter('help')}
            onMouseLeave={() => handleMouseLeave('help')}
          >
            Help
          </button>
        </Link>
=======
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
        <Link to="/help">
          <Info style={{ color: "#9384E3" }} />
        </Link>
>>>>>>> main
      </div>
    </div>
  );
};

export default NavBar;
