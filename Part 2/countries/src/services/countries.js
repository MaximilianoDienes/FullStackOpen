import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5'

export const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

export const getWeather = (capital) => {
    console.log(capital)
    const formattedCapital = capital[0].replace(/\s+/g, '%20');
    return axios.get(`${weatherUrl}/weather?q=${formattedCapital}&APPID=${api_key}`).then(response => response.data)
}

