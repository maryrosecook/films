"use strict";

let path = require("path");

let db = require("../src/db");

const TRAILERS_FILEPATH = path.join(__dirname,
                                    "../data",
                                    "trailers.json");

function trailers() {
  return db.read(TRAILERS_FILEPATH);
};

module.exports = trailers;
