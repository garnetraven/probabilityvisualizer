import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [drawnCardsInfo, setDrawnCardsInfo] = useState(null);
  const [error, setError] = useState(null);
  const [numDraws, setNumDraws] = useState(5); // Default value

  const handleDraw = () => {
    // Fetch drawn cards information from the API with the selected number of draws
    axios.post('http://localhost:5001/draw', { num_draws: numDraws })
      .then(response => {
        setDrawnCardsInfo(response.data.drawn_cards_info);
      })
      .catch(error => {
        console.error('Error fetching drawn cards information:', error);
        setError('Failed to fetch drawn cards information. Please try again later.');
      });
  };

  return (
    <>
      <h1>Welcome to Your Dashboard</h1>
      <div>
        <label htmlFor="numDrawsInput">Number of Draws:</label>
        <input
          type="number"
          id="numDrawsInput"
          value={numDraws}
          onChange={(e) => setNumDraws(parseInt(e.target.value))}
          min={1}
          max={52}
        />
      </div>
      <button onClick={handleDraw}>Draw Cards</button>
      {error && <p>{error}</p>}
      {drawnCardsInfo && (
        <div>
          <h2>Drawn Cards Information</h2>
          <ul>
            {drawnCardsInfo.map((cardInfo, index) => (
              <li key={index}>
                <strong>Drawn Card:</strong> {cardInfo.drawn_card}<br />
                <strong>Unique Probability:</strong> {cardInfo.unique_probability}<br />
                <strong>Dependent Probability:</strong> {cardInfo.dependent_probability}<br />
                <strong>Color Probability:</strong> {cardInfo.color_probability}<br />
                <strong>Suit Probability:</strong> {cardInfo.suit_probability}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/">Home</Link>
    </>
  );
}

export default Dashboard;
