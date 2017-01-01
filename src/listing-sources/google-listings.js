"use strict";

let moment = require("moment");
let _ = require("underscore");

function googleListings(listingPages,
                        pageListings,
                        requestPromise,
                        listing,
                        cinemaName) {
  return listingPages(requestPromise, cinemaName)
    .then((pages) => {
      return Promise.all(
        pages.map(_.partial(pageToListings,
                            pageListings,
                            requestPromise,
                            cinemaName)))
        .then(_.flatten);
    });
};

function pageToListings(pageListings,
                        requestPromise,
                        cinemaName,
                        page) {
  return requestPromise(page.url)
    .then(_.partial(pageListings, _, page.date, cinemaName));
};

module.exports = googleListings;
