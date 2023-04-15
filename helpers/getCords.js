import {GEO_API_KEY} from '@env'

  // Fetch latitude and longitude data for a given city name
  const getCords = async (city) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${GEO_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      const cityName = data.results[0].formatted;
      const { lat, lng } = data.results[0].geometry;
      return [lat, lng, cityName]
    } else {
        return undefined
    }
  };

export {getCords}