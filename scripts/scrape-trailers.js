"use strict";

let path = require("path");

let _ = require("underscore");

let youtube = require("../src/youtube");
let db = require("../src/db");
let listing = require("../src/listing");
let presentedListings = require("../src/presented-listings");

const TRAILERS_FILEPATH = path.join(__dirname,
                                    "../data",
                                    "trailers.json");

const LISTINGS_FILEPATH = path.join(__dirname,
                                    "../data",
                                    "listings.json");


function scrapeTrailers() {
  return trailerUrls(films())
    .then(function(trailerUrls) {
      report(trailerUrls);
      save(TRAILERS_FILEPATH, trailerUrls);
    });
};

function resolveDespiteFailure(promise) {
  return promise
    .then((result) => {
      return result;
    })
    .catch(() => { });
};

function trailerUrls(films) {
  return Promise.all(
    films
      .map((film) => {
        let query = `${film} trailer`;
        return resolveDespiteFailure(youtube(query));
      })
  ).then((trailerUrls) => {
    return _.pick(_.object(films, trailerUrls), (value) => {
      return value;
    });
  });
};

function report(trailerUrls) {
  console.log(`Saving ${_.keys(trailerUrls).length} trailers`);
};

function save(filepath, trailers) {
  db.write(filepath, trailers);
};

function films() {
  let allListings = presentedListings.fromJson(
    listing,
    db.read(LISTINGS_FILEPATH));
  return _.chain(allListings)
    .map((listing) => {
      return listing.film;
    })
    .uniq()
    .value();
};

if (require.main === module) {
  scrapeTrailers();
}

module.exports = scrapeTrailers;
