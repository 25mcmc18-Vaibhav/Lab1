import React from 'react';

function Forecast({ forecast }) {
  // If there is no forecast data yet, don't try to render this section
  if (!forecast || forecast.length === 0) return null;

  return (
    <div>
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => {
          // Convert date text to a friendly day name (e.g., Mon, Tue)
          const date = new Date(day.dt_txt);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={index} className="forecast-card">
              <h4>{dayName}</h4>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                alt="forecast icon" 
              />
              <p>{Math.round(day.main.temp)}°C</p>
              <p style={{ fontSize: '12px', color: '#666' }}>{day.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;