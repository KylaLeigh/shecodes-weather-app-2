export interface CurrentWeatherResponse {
  city: string;
  condition: Condition;
  coordinates: Coordinates;
  temperature: CurrentTemperature;
  country: string;
  time: number;
  wind: Wind;
}

interface CurrentTemperature {
  current: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  time: number;
}

export interface ForecastResponse {
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
  temperature: ForecasteTemperature;
  time: number;
  wind: Wind;
}

interface ForecasteTemperature {
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

interface Wind {
  speed: number;
  digree?: number;
}
