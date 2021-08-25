const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

// const weather = require('./data.weather.json');

const PORT = process.env.PORT || 3001;

app.get('/weather', async (request, response) => {
  //added this and removed .json data
  const weatherResp = await axios.get(
    `http://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}&days=5&land=en`
  );
  const cityData = weatherResp.data;
  if (cityData) {
    const forcasts = cityData.data.map((day) => new Forcast(day));
    response.send(forcasts);
  } else if (cityData.lat !== request.query.lat || cityData.lon !== request.query.lon) {
    response.status('404').send('No weather for this location');
  } else {
    response.status('500').send('internal server error');
  }
});

app.get('/', (request, response) => {
  response.send('Hello, World!');
});

app.get('*', (request, response) => {
  response.status(404).send('not found');
});

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));

class Forcast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}
