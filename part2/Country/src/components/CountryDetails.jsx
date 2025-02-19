const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h4>Languages:</h4>
        <ul>
          {Object.keys(country.languages).map((lang) => (
            <li key={lang}>{country.languages[lang]}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} Flag`} width={200} />
      </div>
    );
  }
  export default CountryDetails