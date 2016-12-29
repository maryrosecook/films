"use strict";

let fs = require("fs-extra");
let path = require("path");

const LISTING_SOURCES_PATH = path.join(__dirname,
                                       "./listing-sources/");

const LISTING_SOURCE_FILENAMES = [
  "hackney-picturehouse.js",
  "rich-mix.js"
];

function listingSources() {
  return LISTING_SOURCE_FILENAMES
    .map(function(listingSourceFilename) {
      return require(path.join(LISTING_SOURCES_PATH,
                               listingSourceFilename));
    });
};

module.exports = listingSources;
