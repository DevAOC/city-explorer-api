const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  const cityData = weather.find((element) => element.lat === request.query.lat && element.lon === request.query.lon);
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
