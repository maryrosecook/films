"use strict";

let britinfo = require("./britinfo");

exports.listings = function listings(requestPromise, listing) {
  const URL =
      "http://www.britinfo.net/cinema/cinema-listings-1003744.htm";

  return britinfo.listings(requestPromise,
                           listing,
                           URL,
                           "Curzon Bloomsbury");
};
