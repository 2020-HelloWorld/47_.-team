import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="welcome-page">
      <h1>Welcome!</h1>
      <Link to='/login'>
        <button className="animate-button">Get Started</button>
      </Link>
    </div>
  );

}

export default Home