// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (filter.trim() === '') {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${filter}`)
      .then((response) => {
        setCountries(response.data);
        setSelectedCountry(null);
      })
      .catch((error) => {
        console.error('Error in searching countries:', error);
      });
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <div>
        <form>
          Find countries <input value={filter} onChange={handleFilterChange} />
        </form>
      </div>
  
      {countries.length === 1 ? (
        <div>
          {countries.map((country) => (
            <div key={country.name.common} onClick={() => handleCountryClick(country)}>
              <h1>{country.name.common}</h1>
              <div>capital {country.capital}</div>
              <div>area {country.area}</div>
              <h2>languages: </h2>
            </div>
          ))}
        </div>
      ) : null}
  
      {countries.length > 1 && countries.length <= 10 ? (
        <div>
          {countries.map((country) => (
            <div key={country.name.common} onClick={() => handleCountryClick(country)}>
              {country.name.common}
            </div>
          ))}
        </div>
      ) : null}
  
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
    </div>
  );
  
};
export default App;
