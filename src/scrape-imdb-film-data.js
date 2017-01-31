"use strict";

let path = require("path");

let _ = require("underscore");

const imdbSearch = require("../src/imdb-search");
const savedListingFilmNames =
      require("../src/saved-listing-film-names");

function scrapeImdbFilmData() {
  let films = savedListingFilmNames();
  return Promise.all(films.map(imdbSearch))
    .then((searches) => {
      return _.object(films, searches);
    });
};

module.exports = scrapeImdbFilmData;
