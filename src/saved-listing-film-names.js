"use strict";

const _ = require("underscore");

function savedListingFilmNames(listings) {
  return _.chain(listings)
    .pluck("film")
    .uniq()
    .value()
};

module.exports = savedListingFilmNames;
