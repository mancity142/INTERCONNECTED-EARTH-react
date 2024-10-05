import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import worldMapData from '../world-110m.json'; // Ensure the path to your file is correct

function WorldMap({ onCountrySelect }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const worldData = feature(worldMapData, worldMapData.objects.countries).features;
    setCountries(worldData);
  }, []);

  const projection = d3.geoMercator().scale(120).translate([800 / 2, 450 / 2]);
  const path = d3.geoPath().projection(projection);

  return (
    <svg width={800} height={450}>
      {countries.map((country, idx) => (
        <path
          key={idx}
          d={path(country)}
          fill="#ccc"
          stroke="#000"
          onClick={() => onCountrySelect(country.properties.name)} // Pass the country name
          style={{ cursor: 'pointer' }}
        />
      ))}
    </svg>
  );
}

export default WorldMap;