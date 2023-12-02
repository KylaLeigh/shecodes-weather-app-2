function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

function searchForCity(city) {
  let apiKey = "deb00dfcbf3af9a3at06d22o4fea87c9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  //   let cityElement = document.querySelector("#weather-app-city");
  //   cityElement.innerHTML = searchInput.value;
  searchForCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchForCity("London");
