"use strict";

let path = require("path");

let requestPromise = require("request-promise");

let listingSources = require("../src/listing-sources");
let scrapeListings = require("../src/scrape-listings");
let db = require("../src/db");

const DATA_DIR = path.join(__dirname, "../data");

scrapeListings(listingSources(), requestPromise)
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
