const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const weather = require('./weather');
const movies = require('./movies');

const app = express();
app.use(cors());

app.get('/weather', weather);
app.get('/movies', movies);
app.get('/', (request, response) => {
  response.send('Hello, World!');
});
app.get('*', (request, response) => {
  response.status(404).send('not found');
});
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
