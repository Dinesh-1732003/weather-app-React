import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async() => {
    if (location) {

      const response = await fetch("http://localhost:5000/weather", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: `${location}` }),
      });
      
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      
      const json = await response.json();
      setWeatherData(json)
      // console.log(weatherData)
      
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
          {/* <p>{weatherData}</p> */}
            <h2>Weather in {weatherData.location}</h2>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Condition: {weatherData.condition}</p>
            {/* <p>Is_day: {weatherData.current.is_day}</p> */}
            <img src={weatherData.icon} alt={weatherData.condition} />
          </>)}
      </div>
    </div>
  );
}

export default App;