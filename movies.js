const axios = require('axios');
const cache = require('./cache');

const movies = async (request, response) => {
  const key = request.query.searchQuery + ' Movies';

  if (cache[key] && (Date.now() - cache[key].timestamp) / 3600000 < 6) {
    response.send(cache[key].data);
  } else {
    try {
      const moviesResp = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.searchQuery}`
      );
      cache[key] = {};
      cache[key].data = moviesResp.data.results.map((movie) => new Movie(movie));
      cache[key].timestamp = Date.now();
      response.status(200).send(cache[key].data);
    } catch (err) {
      console.log(err);
      response.status(500).send(err);
    }
  }
};

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.popularity = movie.popularity;
  }
}

module.exports = movies;
