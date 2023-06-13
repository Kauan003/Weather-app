import React, { useState } from 'react';
import styles from './SearchContainer.module.css';
import { BsSearch } from 'react-icons/bs';


function SearchContainer() {
  const [inputValue, setInputValue] = useState('')
  const [weatherData, setWeatherData] = useState(null) // Novo estado para armazenar os dados

  const dataAtual = new Date()
  const horaAtual = dataAtual.getHours()
  const minutoAtual = dataAtual.getMinutes()

  var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
 
  const dia = dataAtual.getDate()
  const mes = months[dataAtual.getMonth()]
  const ano = dataAtual.getFullYear()

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
        const { main, name, sys, weather, } = data
        console.log(main, name, sys, weather)
        console.log(main.feels_like)
        const temperature = Math.round(main.temp)
        setWeatherData({ main, name, sys, weather, temperature}) // Atualiza o estado com os dados recebidos
      })
      .catch(() => {
        console.log('Ocorreu um erro')
      })
  }

  let weatherIconUrl = null;

if (weatherData && weatherData.weather[0]) {
  const iconCode = weatherData.weather[0].icon;
  weatherIconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${iconCode}.svg`;
}


  return (
    //define a classe do elemento de acordo com a descrição do clima fornecido pela api, formata a string removendo os espaços para ser reconhecido no arquivo css
    <div className={`${styles.box} ${weatherData && weatherData.weather[0] ? styles[weatherData.weather[0].description.replace(/ /g, '')] : ''}`}>
      
      <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="City" />
          <button type="submit">
            <BsSearch />
            </button>
        </form>
        {weatherData && (
            <div className={styles.info}>
              {/* Renderize a imagem do ícone */}
              {weatherIconUrl && <img src={weatherIconUrl} alt="Weather Icon" />} 
              <p>{weatherData.name}</p>
              <p>{weatherData.temperature}°C</p>
            </div>
          )}
      </div>
        <div>{dia + " "+ mes + " " + ano + " | " + horaAtual + ":" + minutoAtual }</div>
        <div>
          {weatherData && (
          <p>{weatherData.weather[0].description}</p>
              )}
        </div>
    </div>
  );
}
export default SearchContainer