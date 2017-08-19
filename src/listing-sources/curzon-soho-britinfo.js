"use strict";

let britinfo = require("./britinfo");

exports.listings = function(requestPromise, listing) {
  const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1003905.htm";
  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Curzon Soho");
};
