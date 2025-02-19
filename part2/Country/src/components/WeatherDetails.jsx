const WeatherDetails = ({ capital, weather }) => {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.main.temp}°C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        <p>{weather.weather[0].description}</p>
        <p>Wind speed: {weather.wind.speed} m/s</p>
      </div>
    );
  }

  export default WeatherDetails