const express = require('express');
const cors = require('cors');
require('dotenv').config();

const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
  response.send({ weather });
});

app.get('/', (request, response) => {
  response.send('Hello, World!');
});

app.get('*', (request, response) => {
  response.status(404).send('not found');
});

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
