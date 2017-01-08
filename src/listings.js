"use strict";

let _ = require("underscore");

function listings(listing, jsonObjects) {
  return jsonObjects.map(function(obj) {
    return listing(obj.dateTime, obj.film, obj.cinema);
  });
};

};

function groupByFilm(listings) {
  return _.chain(listings)
    .groupBy(function(listing) {
      return listing.film;
    })
    .map(function(listings, film) {
      return { film, listings };
    })
    .value();
};

listings.sort = sort;
listings.groupByFilm = groupByFilm;
module.exports = listings;
