import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast'; 

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 

function App() {
  const [searchCity, setSearchCity] = useState('London'); 
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error('City not found. Please check your spelling.');
        }

        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        const dailyForecast = forecastData.list.filter(item => 
          item.dt_txt.includes("12:00:00")
        );
        setForecast(dailyForecast);

      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchWeatherData();
  }, [searchCity]); 

  return (
    <div className="app-container">
      <h1>Weather App</h1>

      <SearchBar onSearch={setSearchCity} />

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <WeatherCard weather={currentWeather} />
          <Forecast forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;