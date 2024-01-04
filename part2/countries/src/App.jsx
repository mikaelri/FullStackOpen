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
  </div>
  )
}

const Countries = ({countriesToShow}) => {
  return (
    <div>
    {countriesToShow.length > 10 && 
    <p>Too many matches, specify another filter</p>
    }

    {countriesToShow.length > 1 && countriesToShow.length <= 10 &&
      countriesToShow.map(country => 
      <div key={country.name.common}>{country.name.common} 
    </div>)
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
    setCountries(country);
  };

  return (
    <div>
      <Filter newFilter={Countryfilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countries} handleClick={handleCountryShow} />
    </div>
  );
  
};
export default App;
