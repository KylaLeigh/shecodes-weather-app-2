function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  dateElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 0) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="row">
             <div class="col-2">
               <div class="forecast-day">
                 ${day}
               </div>
               <div class="forecast-icon">🌤️</div>
               <div class="forecast-temp">
                 <span class="forecast-max-temp">18°C</span>
                 <span class="forecast-min-temp"> / 12°C</span>
               </div>
             </div>
           </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchForCity("London");
displayForecast();
