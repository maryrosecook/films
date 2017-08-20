"use strict";

const path = require("path");

const _ = require("underscore");

let scrapeTrailers = require("../src/scrape-trailers");
const db = require("../src/db");
const scrapeImdbFilmData = require("../src/scrape-imdb-film-data");
const uniqueFilmNames = require("../src/unique-film-names");
const loadListings = require("../src/load-listings");

const FILMS_FILEPATH = path.join(__dirname,
                                 "../data",
                                 "films.json");

function scrapeAndSaveFilmData(films) {
  return Promise.all([scrapeTrailers(films), scrapeImdbFilmData(films)])
    .then(function(data) {
      let trailers = data[0];
      let filmData = data[1];
      let mergedData = mergeData(trailers, filmData);

      save(FILMS_FILEPATH, mergedData);
      report(mergedData);
    });
};

function mergeData(trailers, filmData) {
  let films = _.union(_.keys(trailers), _.keys(filmData));

  return films.reduce((mergedData, film) => {
    mergedData[film] = _.extend({},
                                { trailer: trailers[film] },
                                filmData[film]);
    return mergedData;
  }, {});
};

function report(filmData) {
  console.log(`Saved ${Object.keys(filmData).length} films`);
};

function save(filmsFilepath, filmData) {
  db.write(filmsFilepath, filmData);
};

if (require.main === module) {
  scrapeAndSaveFilmData(uniqueFilmNames(loadListings()));
}

module.exports = scrapeAndSaveFilmData;
