require('dotenv').config();
const imdb = require('imdb-api');

function imdbSearch(filmName) {
  return imdb.get(filmName, {apiKey: process.env.OMDB_API })
    .catch(() => {});
};

module.exports = imdbSearch;
