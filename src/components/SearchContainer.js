import React, { useState } from 'react';
import styles from './SearchContainer.module.css';
import { RiSunLine, RiCloudyLine, RiRainyLine, RiSnowyLine, RiThunderstormsLine  } from 'react-icons/ri';

function SearchContainer() {
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState(null); // Novo estado para armazenar os dados

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const apiKey = "23cf8ee0be25bf809bc65e16be73041b";
  const inputVal = inputValue.toLowerCase();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const temperature = Math.round(main.temp)
        setWeatherData({ main, name, sys, weather, temperature}); // Atualiza o estado com os dados recebidos
      })
      .catch(() => {
        console.log('Ocorreu um erro');
      });
  };

  let weatherIcon;

  if (weatherData && weatherData.weather[0]) {
    const weatherCode = weatherData.weather[0].id;

    if (weatherCode >= 200 && weatherCode <= 232) {
      weatherIcon = <RiThunderstormsLine />;
    } else if (weatherCode >= 300 && weatherCode <= 531) {
      weatherIcon = <RiRainyLine />;
    } else if (weatherCode >= 600 && weatherCode <= 622) {
      weatherIcon = <RiSnowyLine />;
    } else if (weatherCode >= 701 && weatherCode <= 781) {
      weatherIcon = <RiCloudyLine />;
    } else if (weatherCode === 800) {
      weatherIcon = <RiSunLine />;
    } else {
      weatherIcon = null;
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="City" />
          <button type="submit"></button>
        </form>
      </div>
      {weatherData && (
      <div>
        {/* Renderize o ícone */}
        {weatherIcon}
        <p>City: {weatherData.name}</p>
        <p>Temperature: {weatherData.temperature}°C</p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    )}
    </div>
  );
}
export default SearchContainer