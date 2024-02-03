import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Help Page!</h1>
      
      {/* Buttons to navigate to other pages */}
      <Link to="/adv-search">
        <button>Advanced Search</button>
      </Link>
      
      <Link to="/help">
        <button>Help</button>
      </Link>

      <Link to="/compare">
        <button>Compare</button>
      </Link>
    </div>
  );
}

export default Home;
