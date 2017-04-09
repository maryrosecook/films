"use strict";

let _ = require("underscore");

let britinfo = require("./britinfo");

const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1003564.htm";

function listings(requestPromise, listing) {
  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Barbican");
};

module.exports = {
  listings
};
