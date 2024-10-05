import React from 'react';

function CountryButtons({ onCountrySelect }) {
  const countries = ['India', 'China', 'USA', 'Australia', 'Europe', 'South America', 'Antarctica'];

  return (
    <div className="country-buttons">
      {countries.map((country) => (
        <button key={country} onClick={() => onCountrySelect(country)}>
          {country}
        </button>
      ))}
    </div>
  );
}

export default CountryButtons;