"use strict";

const path = require("path");

let scrapeTrailers = require("../src/scrape-trailers");
const db = require("../src/db");

const FILMS_FILEPATH = path.join(__dirname,
                                 "../data",
                                 "films.json");

function scrapeAndSaveFilmData() {
  return scrapeTrailers()
    .then(function(filmData) {
      report(filmData);
      save(FILMS_FILEPATH, filmData);
    });
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
