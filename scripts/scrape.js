"use strict";

let path = require("path");

let requestPromise = require("request-promise");

let cinemas = require("../src/cinemas");
let listings = require("../src/listings");
let db = require("../src/db");

const DATA_DIR = path.join(__dirname, "../data");

listings(cinemas(), requestPromise)
  .then(function(listings) {
    report(listings);
    save(DATA_DIR, listings);
  });

function report(listings) {
  console.log(`Saving ${listings.length} listings`);
};

function save(dataDir, listings) {
  db.write(dataDir, listings);
};