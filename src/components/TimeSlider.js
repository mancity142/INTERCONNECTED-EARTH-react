import React from 'react';

const TimeSlider = ({ years, onTimeChange }) => {
  return (
    <div className="time-slider">
      <label>Years: {years}</label>
      <input
        type="range"
        min="1"
        max="10" // Set the maximum years for the simulation
        value={years}
        onChange={(e) => onTimeChange(e.target.value)}
      />
    </div>
  );
};

export default TimeSlider;