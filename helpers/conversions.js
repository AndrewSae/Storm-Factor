const degToCompass = (num) => {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

const dtToTime = (dt, timezoneOffset) => {
  let date = new Date((timezoneOffset + dt) * 1000).toUTCString()
  return date.slice(-12, -7);
}

const dtToDate = (dt, timezoneOffset) => {
  let date = new Date((timezoneOffset + dt) * 1000)
  let x = date.getMonth() + 1 + "/" + date.getDate()
  return x
}

export { degToCompass, dtToTime, dtToDate }