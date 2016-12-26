var listing = require("./listing");

var _ = require("underscore");

function scrapeListings(listingSources, requestPromise) {
  return Promise.all(
    listingSources.map(function(listingSource) {
      return listingSource.pageContent(requestPromise)
        .then(_.partial(listingSource.listings, _, listing));
    }))
    .then(_.flatten);
};

module.exports = scrapeListings;
