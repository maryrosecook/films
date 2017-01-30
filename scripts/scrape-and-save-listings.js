"use strict";

let path = require("path");

let requestPromise = require("request-promise");

let listingSources = require("../src/listing-sources");
let scrapeListings = require("../src/scrape-listings");
let db = require("../src/db");

const LISTINGS_FILEPATH = path.join(__dirname,
                                    "../data",
                                    "listings.json");

function scrape() {
  return scrapeListings(listingSources(), requestPromise)
    .then(function(listings) {
      report(listings);
      save(LISTINGS_FILEPATH, listings);
    });
};

function report(listings) {
  console.log(`Saving ${listings.length} listings`);
};

function save(listingsFilepath, listings) {
  db.write(listingsFilepath, listings);
};

if (require.main === module) {
  scrape();
}

module.exports = scrape;
