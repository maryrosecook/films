var listing = require("./listing");

var _ = require("underscore");

function scrapeListings(listingSources) {
  return Promise.all(
    listingSources.map(function(listingSource) {
      return listingSource.listings();
    }))
    .then(_.flatten);
};

module.exports = scrapeListings;
