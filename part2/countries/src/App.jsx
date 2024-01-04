import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      Find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Country = ({country}) => {
  const [weather, setWeather] = useState([])
  const [wind, setWind] = useState([])
  const [picture, setPicture] = useState([])
  const API_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_key}&units=metric`)
      .then((response) => {
        setWeather(response.data.main)
        setWind(response.data.wind)
        setPicture(response.data.weather[0])
        console.log('API response:', response.data);
      })
  }, []);

  return (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>

    <h2>languages:</h2>
    <ul>{Object.values(country.languages).map(language => (
      <li key={language}>{language}</li>))}
    </ul>
    <img src={country.flags.png} alt="Country flag" height={100} width={150}/>

    {weather && wind && picture && (
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {weather.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${picture.icon}@2x.png`} alt='weather'></img>
        <div>wind {wind.speed} m/s </div>
      </div>
      )}
  </div>
  )
}

const Countries = ({countriesToShow, countryClick}) => {
  return (
    <div>
    {countriesToShow.length > 10 && 
    <p>Too many matches, specify another filter</p>
    }

    {countriesToShow.length > 1 && countriesToShow.length <= 10 &&
      countriesToShow.map(country => 
      <div key={country.name.common}>{country.name.common}

      <button 
      key={country.name.common} onClick={() => countryClick(country)}>show
      </button>
    </div>
    )
    }

    {countriesToShow.length === 1 &&
      countriesToShow.map(country =>
      <div key={country.name.common}><Country country={country}/></div>)
    }
    </div>
)
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [Countryfilter, setCountryFilter] = useState('');
  const [showAll, setShowAll] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setShowAll(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setCountryFilter(newFilter)

    if (newFilter === '') {
      setCountries([])
    } else {
    setCountries(showAll.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    }
  };
  
  const handleCountryShow = (country) => {
    setCountries([country]);
  };

  return (
    <div>
      <Filter Countryfilter={Countryfilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countries} countryClick={handleCountryShow} />
    </div>
  );
  
};
export default App;
