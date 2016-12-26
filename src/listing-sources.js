"use strict";

let fs = require("fs-extra");
let path = require("path");

const LISTING_SOURCES_PATH = path.join(__dirname,
                                       "./listing-sources/");

function listingSources() {
  return fs.readdirSync(LISTING_SOURCES_PATH)
    .filter(function(listingSourceFilename) {
      return listingSourceFilename.match(/\.js$/);
    })
    .map(function(listingSourceFilename) {
      return require(path.join(LISTING_SOURCES_PATH,
                               listingSourceFilename));
    });
};

module.exports = listingSources;
