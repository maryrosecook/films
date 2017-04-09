"use strict";

let _ = require("underscore");

let britinfo = require("./britinfo");

const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1003905.htm";

function listings(requestPromise, listing) {
  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Curzon Soho");
};

module.exports = {
  listings
};
