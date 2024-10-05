import React, { useEffect, useState } from 'react';

const ParameterForm = ({ country, parameters, onParameterChange, countryStats }) => {
  const [localParameters, setLocalParameters] = useState({
    plasticUsage: countryStats.plasticUsage,
    carbonFootprint: countryStats.carbonFootprint,
    birthRate: countryStats.birthRate,
  });

  useEffect(() => {
    // Set local parameters to country stats when country changes
    setLocalParameters({
      plasticUsage: countryStats.plasticUsage,
      carbonFootprint: countryStats.carbonFootprint,
      birthRate: countryStats.birthRate,
    });
  }, [countryStats]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = parseInt(value, 10);
    setLocalParameters((prev) => ({ ...prev, [name]: newValue })); // Update local parameters
    onParameterChange({ [name]: newValue }); // Notify the parent about the change
  };

  return (
    <div className="parameter-form">
      <h2>Adjust Parameters for {country}</h2>

      <div>
        <label>Plastic Usage: {localParameters.plasticUsage}</label>
        <input
          type="range"
          name="plasticUsage"
          min="0"
          max="100" // Set the appropriate max value based on your application's needs
          value={localParameters.plasticUsage} // Use local parameters for the slider value
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Carbon Footprint: {localParameters.carbonFootprint}</label>
        <input
          type="range"
          name="carbonFootprint"
          min="0"
          max="100" // Set the appropriate max value based on your application's needs
          value={localParameters.carbonFootprint} // Use local parameters for the slider value
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Birth Rate: {localParameters.birthRate}</label>
        <input
          type="range"
          name="birthRate"
          min="0"
          max="50" // Set the appropriate max value based on your application's needs
          value={localParameters.birthRate} // Use local parameters for the slider value
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Population: {countryStats.population} million (Current)</label>
      </div>

      <div>
        <label>Natural Disasters: {countryStats.naturalDisasters}</label>
      </div>
    </div>
  );
};

export default ParameterForm;