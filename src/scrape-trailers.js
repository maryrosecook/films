"use strict";

let path = require("path");

let _ = require("underscore");

let youtube = require("../src/youtube");
let listing = require("../src/listing");
let presentedListings = require("../src/presented-listings");
const imdbSearch = require("../src/imdb-search");
const savedListingFilmNames =
      require("../src/saved-listing-film-names");

function scrapeTrailers() {
  return filterUnfindableFilms(savedListingFilmNames())
    .then(trailerUrls)
};

function filterUnfindableFilms(films) {
  return Promise.all(films.map(imdbSearch))
    .then((searches) => {
      return _.zip(films, searches)
        .filter((filmAndSearch) => {
          let search = filmAndSearch[1];
          return search !== undefined;
        })
        .map((filmAndSearch) => {
          let film = filmAndSearch[0];
          return film;
        });
    });
};

function resolveDespiteFailure(promise) {
  return promise.catch(() => { });
};

function trailerUrls(films) {
  return Promise.all(
    films
      .map(_.compose(resolveDespiteFailure, youtube, createQuery))
  ).then((trailerUrls) => {
    return _.pick(_.object(films, trailerUrls), (value) => {
      return value;
    });
  });
};

function createQuery(film) {
  return `${film} trailer`;
};

module.exports = scrapeTrailers;
