import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [drawnCardsInfo, setDrawnCardsInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch drawn cards information from the API when the component mounts
    axios.post('http://localhost:5001/draw', { num_draws: 5 }) // Change num_draws as needed
      .then(response => {
        setDrawnCardsInfo(response.data.drawn_cards_info);
      })
      .catch(error => {
        console.error('Error fetching drawn cards information:', error);
        setError('Failed to fetch drawn cards information. Please try again later.');
      });
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <>
      <h1>Welcome to Your Dashboard</h1>
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
    </>
  );
}

export default Dashboard;
