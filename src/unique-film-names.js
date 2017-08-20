"use strict";

const _ = require("underscore");

module.exports = function uniqueFilmNames(listings) {
  return _.chain(listings)
    .pluck("film")
    .uniq()
    .value()
};
