import axios, { AxiosResponse } from "axios";

interface ForecastResponse {
  city: string;
  coordinates: Coordinates;
  country: string;
  daily: Day[];
}

interface Coordinates {
latitude: number;
longitude: number;
}

interface Day {
   condition: Condition;
   temperature: Temperature;
   time: number;
   wind: {speed: number};
 };

 interface Temperature {
  day: number;
  humidity: number;
  maximum: number;
  minimum: number;
 }

 interface Condition {
  description: string;
  icon: string;
  icon_url: string;
 }

const apiKey = "deb00dfcbf3af9a3at06d22o4fea87c9";

function updateWeather(response:) {
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#weather-app-city");
  const descriptionElement = document.querySelector("#weather-description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const dateElement = document.querySelector("#date");
  const iconElement = document.querySelector("#icon");

  const currentTemperature = response.data.temperature.current;
  const date = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  dateElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

function formatDate(date: Date) {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  return `${day} ${hours}:${minutes.toString().padStart(2, "0")}`;
}

function searchForCity(city: string) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event: Event) {
  event.preventDefault();

  const searchInput = document.querySelector(
    "#search-form-input"
  ) as HTMLInputElement;

  searchForCity(searchInput?.value);
  getForecast(searchInput?.value);
}

function formatForecastDay(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city: string) {
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get<ForecastResponse>(apiUrl).then(displayForecast);
}

function displayForecast(response: AxiosResponse<ForecastResponse>): void {
  let forecastHtml = "";

  response.data.daily.forEach(function (day: Day, index) {
    if (index < 6 && index > 0) {
      forecastHtml =
        forecastHtml +
        `<div class="row">
          <div class="col-2">
            <div class="forecast-day">
              ${formatForecastDay(day.time)}</div>
            <img class="forecast-icon" src="${day.condition.icon_url}"/>
            <div class="forecast-temp">
              <span class="forecast-max-temp">${Math.round(
                day.temperature.maximum
              )}°C</span>
              <span class="forecast-min-temp"> / ${Math.round(
                day.temperature.minimum
              )}°C</span>
            </div>
          </div>
        </div>`;
    }
  });

  const forecastElement = document.querySelector("#forecast");

  if (forecastElement) {
    forecastElement.innerHTML = forecastHtml;
  }
}

const searchFormElement = document.querySelector("#search-form");
searchFormElement?.addEventListener("submit", handleSearch);

searchForCity("London");
getForecast("London");
