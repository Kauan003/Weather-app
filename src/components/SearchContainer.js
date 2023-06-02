import React, { useState } from 'react';
import styles from './SearchContainer.module.css';
// import { RiSunLine, RiCloudyLine, RiRainyLine, RiSnowyLine, RiThunderstormsLine, RiMoonClearLine   } from 'react-icons/ri';

function SearchContainer() {
  const [inputValue, setInputValue] = useState('')
  const [weatherData, setWeatherData] = useState(null) // Novo estado para armazenar os dados

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  };

  const apiKey = "23cf8ee0be25bf809bc65e16be73041b"
  const inputVal = inputValue.toLowerCase()
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

  const handleFormSubmit = (event) => {
    event.preventDefault()
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data
        const temperature = Math.round(main.temp)
        setWeatherData({ main, name, sys, weather, temperature}) // Atualiza o estado com os dados recebidos
      })
      .catch(() => {
        console.log('Ocorreu um erro')
      })
  }

  const weatherBackgrounds = {
    thunderstorms: 'url(src/images/thunderstorms-image.webp)',
    rainy: 'url(src/images/rainy-image.webp)',
    snowy: 'url(src/images/snowy-image.webp)',
    cloudy: 'url(src/images/cloudy-image.webp)',
    sunny: 'url(src/images/sunny-image.webp)',
  }

  let backgroundImage = null;

if (weatherData && weatherData.weather[0]) {
  const weatherCode = weatherData.weather[0].id;

  if (weatherCode >= 200 && weatherCode <= 232) {
    backgroundImage = weatherBackgrounds.thunderstorms;
  } else if (weatherCode >= 300 && weatherCode <= 531) {
    backgroundImage = weatherBackgrounds.rainy;
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    backgroundImage = weatherBackgrounds.snowy;
  } else if (weatherCode >= 701 && weatherCode <= 781) {
    backgroundImage = weatherBackgrounds.cloudy;
  } else if (weatherCode === 800) {
    backgroundImage = weatherBackgrounds.sunny;
  }
}
  let weatherIconUrl = null;

if (weatherData && weatherData.weather[0]) {
  const iconCode = weatherData.weather[0].icon;
  weatherIconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${iconCode}.svg`;
}

  return (
    <div className={`${styles.box} ${backgroundImage && styles.withBackground}`} style={{ backgroundImage }}>
      <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="City" />
          <button type="submit"></button>
        </form>
      </div>
      {weatherData && (
      <div>
        {/* Renderize a imagem do ícone */}
        {weatherIconUrl && <img src={weatherIconUrl} alt="Weather Icon" />}
        <p>City: {weatherData.name}</p>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Description: {weatherData.weather[0].description}</p>
      </div>
    )}
    </div>
  );
}
export default SearchContainer