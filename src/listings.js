"use strict";

let _ = require("underscore");

function listings(listing, jsonObjects) {
  return jsonObjects.map(function(obj) {
    return listing(obj.dateTime, obj.film, obj.cinema);
  });
};

function groupByDateAndFilm(listings) {
  return _.chain(listings)
    .groupBy(function(listing) {
      return listing.dateTime.format("YYYY-MM-DD");
    })
    .map(function(dateListings, date) {
      return { date, films: prepareFilms(dateListings) };
    })
    .value();
};

function argumentsObject(names) {
  return function() {
    return _.object(names, _.toArray(arguments))
  };
};

function prepareFilms(listings) {
  return _.chain(listings)
    .sort(function(listing1, listing2) {
      return listing1.dateTime.diff(listing2.dateTime);
    })
    .groupBy(_.property("film"))
    .map(argumentsObject(["listings", "film"]))
    .sort(function(a, b) {
      return alphabeticalSortOrder(a.film, b.film);
    })
    .value();
};

function alphabeticalSortOrder(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1
  } else {
    return 0;
  }
};

function groupByFilm(listings) {
  return _.chain(listings)
    .groupBy(_.property("film"))
    .map(argumentsObject(["listings", "film"]))
    .value();
};

listings.groupByFilm = groupByFilm;
listings.groupByDateAndFilm = groupByDateAndFilm;
module.exports = listings;
