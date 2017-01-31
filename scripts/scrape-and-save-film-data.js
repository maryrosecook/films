"use strict";

const path = require("path");

const _ = require("underscore");

let scrapeTrailers = require("../src/scrape-trailers");
const db = require("../src/db");
const scrapeImdbFilmData = require("../src/scrape-imdb-film-data");

const FILMS_FILEPATH = path.join(__dirname,
                                 "../data",
                                 "films.json");

function scrapeAndSaveFilmData() {
  return Promise.all([scrapeTrailers(), scrapeImdbFilmData()])
    .then(function(data) {
      let trailers = data[0];
      let filmData = data[1];
      let mergedData = mergeData(trailers, filmData);

      report(mergedData);
      save(FILMS_FILEPATH, mergedData);
    });
};

function mergeData(trailers, filmData) {
  let films = _.union(_.keys(trailers), _.keys(filmData));

  return films.reduce((mergedData, film) => {
    mergedData[film] = _.extend({}, trailers[film], filmData[film]);
    return mergedData;
  }, {});
};

function report(filmData) {
  console.log(`Saving ${Object.keys(filmData).length} films`);
};

function save(filmsFilepath, filmData) {
  db.write(filmsFilepath, filmData);
};

if (require.main === module) {
  scrapeAndSaveFilmData();
}

module.exports = scrapeAndSaveFilmData;
