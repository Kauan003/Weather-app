import React, { useState } from 'react';
import styles from './SearchContainer.module.css';

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
        setWeatherData({ main, name, sys, weather }); // Atualiza o estado com os dados recebidos
      })
      .catch(() => {
        console.log('Ocorreu um erro');
      });
  };

  return (
    <div className={styles.box}>
      <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="City" />
          <button type="submit"></button>
        </form>
      </div>
      {weatherData && ( // Renderiza os dados somente se existirem
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
export default SearchContainer