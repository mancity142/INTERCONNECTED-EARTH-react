import React from 'react';

function DetailedBox({ country, stats }) {
  if (!country) return <div>Select a country to see details</div>;
  if (!stats) return <div>Loading country data...</div>; // Handle undefined stats

  const uniqueFacts = {
    India: 'India is the largest populous country in the world.',
    China: 'China is the most populous country.',
    USA: 'The USA has the world\'s largest economy.',
    Australia: 'Australia is known for its unique wildlife.',
    Europe: 'Europe is home to many ancient civilizations.',
    SouthAmerica: 'The Amazon Rainforest is in South America.',
    Antarctica: 'Antarctica has the coldest temperature on Earth.',
    Africa: 'Africa is known for its diverse cultures and wildlife.',
    Others: 'Various countries with varying environmental impacts.'
  };
    return (
      <div className="detailed-box">
        <h3>Statistics for {country}</h3>
        <p>Plastic Usage: {stats.plasticUsage}</p>
        <p>Carbon Footprint: {stats.carbonFootprint}</p>
        <p>Birth Rate: {stats.birthRate}</p>
        <p>Population: {stats.population} million</p>
        <p>Natural Disasters: {stats.naturalDisasters}</p>
      </div>
    );
  };

export default DetailedBox;