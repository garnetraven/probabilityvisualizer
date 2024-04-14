import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Probability Visualizer</h1>
      <p>This is an app to visualize probability.</p>
      <Link to="/login">Register / Login</Link>
    </div>
  );
}

export default Home;
