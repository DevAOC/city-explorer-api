const axios = require('axios');

const weather = async (request, response) => {
  try {
    const weatherResp = await axios.get(
      `http://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}&days=5&lang=en`
    );
    const forecasts = weatherResp.data.data.map((day) => new Forecast(day));
    response.status(200).send(forecasts);
  } catch (err) {
    response.send(err);
  }
};

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

module.exports = weather;
