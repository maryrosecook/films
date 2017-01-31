"use strict";

let _ = require("underscore");
let moment = require("moment-timezone");

let loadFilmData = require("./load-film-data");

function prepare(listings) {
  return groupByDateAndFilm(todayAndAfter(listings));
};

function todayAndAfter(listings) {
  return listings.filter(function(listing) {
    return listing.dateTime.isAfter(moment().startOf("day"));
  });
};

function groupByDateAndFilm(listings) {
  return _.chain(listings)
    .groupBy((listing) => {
      return listing.dateTime.format("YYYY-MM-DD");
    })
    .map((dateListings, date) => {
      return { date, films: prepareFilms(dateListings) };
    })
    .sortBy((dateGroup1, dateGroup2) => {
      return moment(dateGroup1.date).diff(moment(dateGroup2.date));
    })
    .map((dateGroup) => {
      return {
        date: moment(dateGroup.date).format("dddd Do MMMM"),
        films: dateGroup.films
      };
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
    .sort((listing1, listing2) => {
      return listing1.dateTime.diff(listing2.dateTime);
    })
    .groupBy(_.property("film"))
    .map(argumentsObject(["listings", "film"]))
    .map(listingsByCinema)
    .map(addFilmData)
    .sort((a, b) => {
      return alphabeticalSortOrder(a.film, b.film);
    })
    .value();
};

function listingsByCinema(filmAndListings) {
  filmAndListings.cinemas =
    _.chain(filmAndListings.listings)
    .groupBy(_.property("cinema"))
    .map(argumentsObject(["listings", "cinema"]))
    .value();

  delete filmAndListings["listings"];
  return filmAndListings;
};

function addFilmData(filmListingsBlock) {
  let filmData = loadFilmData();
  if (filmListingsBlock.film in filmData) {
    _.extend(filmListingsBlock, filmData[filmListingsBlock.film]);
  }

  return filmListingsBlock;
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

module.exports = {
  prepare
};
