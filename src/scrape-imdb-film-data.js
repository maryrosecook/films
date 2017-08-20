"use strict";

let path = require("path");

let _ = require("underscore");

const imdbSearch = require("../src/imdb-search");

function scrapeImdbFilmData(films) {
  return Promise.all(films.map(imdbSearch))
    .then((searches) => {
      return _.object(films, searches);
    });
};

module.exports = scrapeImdbFilmData;
