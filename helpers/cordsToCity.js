import { GEO_API_KEY } from '@env'

async function cordsToCity(lat, lng) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${GEO_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const city = await data.results[0].components.town;
  return city;

}

export { cordsToCity }