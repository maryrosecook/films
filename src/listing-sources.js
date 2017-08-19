"use strict";

let fs = require("fs-extra");
let path = require("path");

const LISTING_SOURCES_PATH = path.join(__dirname,
                                       "./listing-sources/");

function listingSources() {
  return listingSourcesNames()
    .map(name => {
      return path.join(LISTING_SOURCES_PATH, name)
    })
    .map(require);
};

function listingSourcesNames() {
  return fs.readdirSync(LISTING_SOURCES_PATH)
    .filter(name => { return name.includes(".js") })
};

module.exports = listingSources;
