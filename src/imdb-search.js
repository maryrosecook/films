const imdb = require('imdb-api');

function imdbSearch(filmName) {
  return imdb.get(filmName)
    .then((data) => {
      return data;
    })
    .catch(() => {});
};

module.exports = imdbSearch;
