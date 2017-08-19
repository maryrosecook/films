"use strict";

let britinfo = require("./britinfo");

exports.listings = function listings(requestPromise, listing) {
  const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1004176.htm";

  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Electric Cinema");
};
