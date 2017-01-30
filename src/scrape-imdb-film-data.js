"use strict";

let path = require("path");

let _ = require("underscore");

const imdbSearch = require("../src/imdb-search");
const savedListingFilmNames =
      require("../src/saved-listing-film-names");

function scrapeImdbFilmData() {
  return Promise.all(savedListingFilmNames().map(imdbSearch));
};

module.exports = scrapeImdbFilmData;
