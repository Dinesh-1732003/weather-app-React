import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = () => {
    if (location) {
      fetch(`https://api.weatherapi.com/v1/current.json?key=d7792c4b0e7a4204a9e91703240107&q=${location}`)
        .then(res => res.json())
        .then(data => setWeatherData(data))
        .catch(err => console.error(err));
    } else {
      alert('Please enter a location.');
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        id="location-input"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button id="get-weather-btn" onClick={getWeather}>Get Weather</button>
      <div id="weather-result">
        {weatherData && (
          <>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Is_day: {weatherData.current.is_day}</p>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;