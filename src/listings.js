var listing = require("./listing");

var _ = require("underscore");

function listings(cinemas, requestPromise) {
  return Promise.all(
    cinemas.map(function(cinema) {
      return cinema.pageContent(requestPromise)
        .then(_.partial(cinema.listings, _, listing));
    }))
    .then(_.flatten);
};

module.exports = listings;
