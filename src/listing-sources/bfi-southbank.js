"use strict";

let _ = require("underscore");
const googleListings = require("./google-listings");
const googleListingPages = require("./google-listing-pages");
const googlePageListings = require("./google-page-listings");
const listing = require("../listing");

function listings(requestPromise) {
  return googleListings(googleListingPages,
                        googlePageListings,
                        requestPromise,
                        listing,
                        "BFI Southbank");
};

module.exports = {
  listings
};
