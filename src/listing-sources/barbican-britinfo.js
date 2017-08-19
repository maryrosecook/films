"use strict";

let britinfo = require("./britinfo");

exports.listings = function(requestPromise, listing) {
  const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1003564.htm";
  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Barbican");
};
