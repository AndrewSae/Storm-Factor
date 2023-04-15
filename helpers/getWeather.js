import {WEATHER_API_KEY} from '@env'

 // Fetch weather data for a given latitude and longitude
  const getWeather = async (lat, lng) => {
    // url for the requrest
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=imperial&appid=${WEATHER_API_KEY}`;
    // wait for the responnce 
    const response = await fetch(url);
    // wait for the json data   
    const data = await response.json();
    return data
  };

  export {getWeather}