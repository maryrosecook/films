"use strict";

let path = require("path");

let db = require("../src/db");

const FILMS_FILEPATH = path.join(__dirname,
                                 "../data",
                                 "films.json");

function loadFilmData() {
  return db.read(FILMS_FILEPATH);
};

module.exports = loadFilmData;
