import React from 'react';

function WeatherCard({ weather }) {
  // If there is no weather data yet, don't try to render the card
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <img 
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt="weather icon" 
      />
      <h1>{Math.round(weather.main.temp)}°C</h1>
      <p><strong>Condition:</strong> {weather.weather[0].main}</p>
      <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;