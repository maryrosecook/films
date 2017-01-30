"use strict";

let path = require("path");

let db = require("../src/db");

const LISTINGS_FILEPATH = path.join(__dirname,
                                    "../data",
                                    "listings.json");

function loadListings(listing) {
  return db.read(LISTINGS_FILEPATH).map((obj) => {
    return listing(obj.dateTime, obj.film, obj.cinema, obj.url);
  });
};

module.exports = loadListings;
