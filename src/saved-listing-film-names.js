"use strict";

const _ = require("underscore");

let loadListings = require("../src/load-listings");

function savedListingFilmNames() {
  return _.chain(loadListings())
    .pluck("film")
    .uniq()
    .value();
};

module.exports = savedListingFilmNames;
