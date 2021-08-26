const axios = require('axios');

const movies = async (request, response) => {
  try {
    const moviesResp = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.searchQuery}`
    );
    const movieData = moviesResp.data;
    if (movieData) {
      const movies = movieData.results.map((movie) => new Movie(movie));
      response.status(200).send(movies);
    } else if (movieData === undefined) {
      response.status(404).send('No movies for this location');
    } else {
      response.status(500).send('Internal server error');
    }
  } catch (err) {
    console.log(err);
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
