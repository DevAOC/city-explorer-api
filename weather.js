const axios = require('axios');
// const { request, response } = require('express');

const weather = async (request, response) => {
  const weatherResp = await axios.get(
    `http://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}&days=5&lang=en`
  );
  const cityData = weatherResp.data;
  if (cityData) {
    const forecasts = cityData.data.map((day) => new Forecast(day));
    response.status(200).send(forecasts);
  } else if (cityData.lat !== request.query.lat || cityData.lon !== request.query.lon) {
    response.status(404).send('No weather for this location');
  } else {
    response.status(500).send('internal server error');
  }
};

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

module.exports = weather;
