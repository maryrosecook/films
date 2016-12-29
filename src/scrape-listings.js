var listing = require("./listing");

var _ = require("underscore");

function scrapeListings(listingSources, requestPromise) {
  return Promise.all(
    listingSources.map(function(listingSource) {
      return listingSource.listings(requestPromise, listing);
    }))
    .then(_.flatten);
};

module.exports = scrapeListings;
