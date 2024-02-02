/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getAll, getWeather } from './services/countries';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState({})

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleShowClick = (name) => {
    setSearchInput(name)
  }

  useEffect(() => {
    getAll()
    .then(dbCountries => {
      console.log(dbCountries)
      setCountries(dbCountries)
    })
  }, [])

  useEffect(() => {
    const matchingCountries = countries.filter(country =>
      country.name.common.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    setFilteredCountries(matchingCountries);
    console.log(matchingCountries)
  }, [searchInput])

  useEffect(() => {
    if (filteredCountries.length === 1 && Object.keys(weather).length === 0) {
      getWeather(filteredCountries[0].capital)
      .then(fetchedWeather => {
        setWeather(fetchedWeather)
      })
    } else if (filteredCountries.length > 1 && Object.keys(weather).length > 0) {
      setWeather({})
    }
  }, [filteredCountries])

  if (countries.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h1>find countries</h1>
      <input value={searchInput} onChange={handleSearchInputChange}></input>
      <div>
      {filteredCountries.length < 10 && filteredCountries.length > 1 ? (
          filteredCountries.map((c) => (
          <div key={c.name.common}>
            <p key={c.name.common}>{c.name.common}</p>
            <button onClick={() => handleShowClick(c.name.common)}>Show</button>
          </div>
          ))
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0]?.name.common}</h2>
            <p>area {filteredCountries[0]?.area}</p>
            <p>capital {filteredCountries[0]?.capital[0]}</p>
            <p><strong>Languages:</strong></p>
            <ul>
              {Object.keys(filteredCountries[0]?.languages || {}).map((key) => (
                <li key={key}>{filteredCountries[0].languages[key]}</li>
              ))}
            </ul>
            <h2>Weather in {filteredCountries[0]?.capital[0]}</h2>
            {weather.main && weather.weather && weather.wind ? (
              <div>
                <p>temperature {weather.main.temp - 273.15} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <p>wind {weather.wind.speed} m/s</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
            <img src={filteredCountries[0]?.flags.png} alt={filteredCountries[0]?.flags.alt} />
          </div>
        ) : (
          <p>Search a country</p>
        )}
      </div>
    </div>
  )
}

export default App