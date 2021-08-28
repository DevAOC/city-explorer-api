const axios = require('axios');
const cache = require('./cache');

const weather = async (request, response) => {
  const key = request.query.searchQuery + ' Forcast';

  if (cache[key] && (Date.now() - cache[key].timestamp) / 3600000 < 6) {
    console.log('HITTTTTT');
    response.send(cache[key].data);
  } else {
    try {
      console.log('MISSSSSS');
      const weatherResp = await axios.get(
        `http://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}&days=5&lang=en`
      );
      cache[key] = {};
      cache[key].data = weatherResp.data.data.map((day) => new Forecast(day));
      cache[key].timestamp = Date.now();
      response.status(200).send(cache[key].data);
    } catch (err) {
      console.log(err);
      response.status(500).send(err);
    }
  }
};

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

module.exports = weather;
