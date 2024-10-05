import React, { useState } from 'react';
import WorldMap from './components/WorldMap';
import ParameterForm from './components/ParameterForm';
import TimeSlider from './components/TimeSlider';
import DetailedBox from './components/DetailedBox'; // Import the DetailedBox component
import './App.css';

// Initial countries data
const initialCountriesData = {
  India: {
    plasticUsage: 5,
    carbonFootprint: 7,
    birthRate: 20,
    naturalDisasters: 20,
    population: 1391, // Current population in millions
  },
  China: {
    plasticUsage: 30,
    carbonFootprint: 60,
    birthRate: 12,
    naturalDisasters: 40,
    population: 1441,
  },
  USA: {
    plasticUsage: 25,
    carbonFootprint: 50,
    birthRate: 14,
    naturalDisasters: 20,
    population: 331,
  },
  Australia: {
    plasticUsage: 2,
    carbonFootprint: 20,
    birthRate: 12,
    naturalDisasters: 10,
    population: 25,
  },
  Europe: {
    plasticUsage: 20,
    carbonFootprint: 25,
    birthRate: 10,
    naturalDisasters: 15,
    population: 747,
  },
  SouthAmerica: {
    plasticUsage: 5,
    carbonFootprint: 30,
    birthRate: 17,
    naturalDisasters: 15,
    population: 430,
  },
  Africa: {
    plasticUsage: 3,
    carbonFootprint: 35,
    birthRate: 27,
    naturalDisasters: 25,
    population: 1340,
  },
  Antarctica: {
    plasticUsage: 0,
    carbonFootprint: 0,
    birthRate: 0,
    naturalDisasters: 0,
    population: 0,
  },
  Others: {
    plasticUsage: 10,
    carbonFootprint: 45,
    birthRate: 15,
    naturalDisasters: 30,
    population: 500,
  },
};

// Calculate global average values
const calculateGlobalParameters = (countriesData, selectedCountry) => {
  let totalParameters = {
    plasticUsage: 0,
    carbonFootprint: 0,
    birthRate: 0,
    naturalDisasters: 0,
    population: 0,
  };
  let totalCountries = 0;

  for (const country in countriesData) {
    if (country !== selectedCountry) { // Exclude selected country from calculations
      totalParameters.plasticUsage += countriesData[country].plasticUsage;
      totalParameters.carbonFootprint += countriesData[country].carbonFootprint;
      totalParameters.birthRate += countriesData[country].birthRate;
      totalParameters.naturalDisasters += countriesData[country].naturalDisasters;
      totalParameters.population += countriesData[country].population;
      totalCountries++;
    }
  }

  // Calculate global population as the sum of all countries
  totalParameters.population += countriesData[selectedCountry].population; // Include selected country's population

  return {
    plasticUsage: (totalParameters.plasticUsage / totalCountries).toFixed(2),
    carbonFootprint: (totalParameters.carbonFootprint / totalCountries).toFixed(2),
    birthRate: (totalParameters.birthRate / totalCountries).toFixed(2),
    naturalDisasters: (totalParameters.naturalDisasters / totalCountries).toFixed(2),
    population: totalParameters.population.toFixed(2), // Total population
  };
};

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [parameters, setParameters] = useState({});
  const [years, setYears] = useState(1);
  const [results, setResults] = useState({});
  const [countryStats, setCountryStats] = useState({}); // State to hold selected country stats

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    const globalParameters = calculateGlobalParameters(initialCountriesData, country); // Calculate new global parameters based on selection
    setParameters(globalParameters); // Set global parameters for the selected country
    setCountryStats(initialCountriesData[country]); // Set the country stats for DetailedBox
  };

  const handleParameterChange = (newParams) => {
    setParameters((prevParams) => ({ ...prevParams, ...newParams }));
    const updatedResults = simulateImpact({ ...parameters, ...newParams, years }); // Include years
    setResults(updatedResults);
  };

  const handleTimeChange = (newYears) => {
    const updatedYears = parseInt(newYears, 10); // Ensure years is an integer
    setYears(updatedYears);
    const updatedResults = simulateImpact({ ...parameters, years: updatedYears }); // Pass updated years to simulateImpact
    setResults(updatedResults);
  };

  const simulateImpact = (params) => {
    const { plasticUsage, carbonFootprint, birthRate, naturalDisasters, years } = params; // Ensure years is included

    // Interconnection logic
    const populationImpact = countryStats.population + (birthRate * years);
    const airQuality = (100 - (plasticUsage * 0.4 + carbonFootprint * 0.4 + naturalDisasters * 0.2 + (years * 0.1))).toFixed(2);
    const biodiversity = (100 - (naturalDisasters * 0.5 + plasticUsage * 0.3 + carbonFootprint * 0.1 + (years * 0.1) + (birthRate * 0.2))).toFixed(2);
    const seaLevel = Math.min((naturalDisasters * 0.5 + (carbonFootprint * 0.2) + (plasticUsage * 0.1) + (years * 0.5)), 100).toFixed(2);
    const mortalityRate = Math.min((5 - (birthRate / 10) + naturalDisasters * 0.5 + (years * 0.3) + (plasticUsage * 0.1) + (carbonFootprint * 0.1)), 100).toFixed(2);

    return {
      airQuality: Math.max(0, airQuality),
      biodiversity: Math.max(0, biodiversity),
      seaLevel: Math.max(0, seaLevel),
      mortalityRate: Math.max(0, mortalityRate),
      population: populationImpact.toFixed(2),
    };
  };

  return (
    <div className="app-container">
      <h1>Environmental Impact Simulation</h1>
      <WorldMap onCountrySelect={handleCountrySelect} />

      <div className="controls">
        {Object.keys(initialCountriesData).map((country) => (
          <button key={country} onClick={() => handleCountrySelect(country)}>
            {country}
          </button>
        ))}
      </div>

      {selectedCountry && (
        <ParameterForm
          country={selectedCountry}
          parameters={parameters} // Displaying global parameters
          onParameterChange={handleParameterChange}
          countryStats={countryStats} // Pass the country stats to ParameterForm
        />
      )}

      <TimeSlider years={years} onTimeChange={handleTimeChange} />

      {/* Add DetailedBox to display selected country stats */}
      {selectedCountry && (
        <DetailedBox country={selectedCountry} stats={countryStats} />
      )}

      <div className="results">
        <h3>Current Levels for Global Averages</h3>
        <p>Air Quality: {results.airQuality}%</p>
        <p>Biodiversity: {results.biodiversity}%</p>
        <p>Sea Level Rise: {results.seaLevel}%</p>
        <p>Mortality Rate: {results.mortalityRate}%</p>
        <p>Global Population: {results.population} million</p>
      </div>
    </div>
  );
}

export default App;