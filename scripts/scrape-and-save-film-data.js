"use strict";

const path = require("path");

let scrapeTrailers = require("../src/scrape-trailers");
const db = require("../src/db");

const FILMS_FILEPATH = path.join(__dirname,
                                 "../data",
                                 "films.json");

function scrapeAndSaveFilmData() {
  return scrapeTrailers()
    .then(function(films) {
      report(films);
      save(FILMS_FILEPATH, films);
    });
};

function report(films) {
  console.log(`Saving ${Object.keys(films).length} films`);
};

function save(filmsFilepath, films) {
  db.write(filmsFilepath, films);
};

if (require.main === module) {
  scrapeAndSaveFilmData();
}

module.exports = scrapeAndSaveFilmData;
