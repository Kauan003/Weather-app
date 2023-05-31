import React, { useState } from 'react';
import styles from './SearchContainer.module.css'

function SearchContainer() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue)
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Aqui você pode manipular a resposta da API, se necessário
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // Em caso de erro na requisição
    //     console.log('Ocorreu um erro:', error);
    //   });
  };

  return (
    <div className={styles.search}>
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button type='submit'></button>
        </form>
    </div>
  );
}

export default SearchContainer;