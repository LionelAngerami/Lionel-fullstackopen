import { useState, useEffect } from "react"
import axios from "axios"
import CountryDetails from "./components/CountryDetails"
import WeatherDetails from "./components/WeatherDetails"

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all"
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?"

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(API_URL).then((response) => setCountries(response.data))
  }, []);

 
  useEffect(() => {
    if (selectedCountry && WEATHER_API_KEY) {
      axios
        .get(`${WEATHER_API_URL}lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}&appid=${WEATHER_API_KEY}`)
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Error fetching weather data:", error))
    }
  }, [selectedCountry]);


  const handleSearch = (event) => setSearch(event.target.value);
 
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    }
  }, [filteredCountries]);


  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} placeholder="Search for a country..." />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, please specify further.</p>
      ) : null}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common} <button onClick={() => setSelectedCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      ) : null}
      {selectedCountry ? (
        <div>
          <CountryDetails country={selectedCountry} />
          {weather ? (
            <WeatherDetails capital={selectedCountry.capital} weather={weather
            } />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;