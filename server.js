const express = require('express');
const cors = require('cors');
// const axios = require('axios');
require('dotenv').config();

const weather = require('./weather');
const movies = require('./movies');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', weather);

// {
//   const weatherResp = await axios.get(
//     `http://api.weatherbit.io/v2.0/forecast/daily/?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}&days=5&lang=en`
//   );
//   const cityData = weatherResp.data;
//   if (cityData) {
//     const forecasts = cityData.data.map((day) => new Forecast(day));
//     response.status(200).send(forecasts);
//   } else if (cityData.lat !== request.query.lat || cityData.lon !== request.query.lon) {
//     response.status(404).send('No weather for this location');
//   } else {
//     response.status(500).send('internal server error');
//   }
// });

app.get('/movies', movies);

// {
//   const moviesResp = await axios.get(
//     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.searchQuery}`
//   );
//   const movieData = moviesResp.data;
//   if (movieData) {
//     const movies = movieData.results.map((movie) => new Movie(movie));
//     response.status(200).send(movies);
//   } else if (movieData === undefined) {
//     response.status(404).send('No movies for this location');
//   } else {
//     response.status(500).send('Internal server error');
//   }
// });

app.get('/', (request, response) => {
  response.send('Hello, World!');
});

app.get('*', (request, response) => {
  response.status(404).send('not found');
});

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));

// class Forecast {
//   constructor(day) {
//     this.date = day.datetime;
//     this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
//   }
// }

// class Movie {
//   constructor(movie) {
//     this.title = movie.title;
//     this.overview = movie.overview;
//     // this.averageVotes = movie.average_votes;
//     // this.totalVotes = movie.total_votes;
//     this.popularity = movie.popularity;
//   }
// }
