const imdb = require('imdb-api');

function imdbSearch(filmName) {
  return imdb.get(filmName)
    .catch(() => {});
};

module.exports = imdbSearch;
