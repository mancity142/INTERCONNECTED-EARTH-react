import React from 'react';

const ResultsDisplay = ({ parameters }) => {
  return (
    <div className="results-display">
      <h2>Current Parameter Levels</h2>
      <ul>
        {Object.entries(parameters).map(([key, value]) => (
          <li key={key}>
            {key.replace(/([A-Z])/g, ' $1')}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;