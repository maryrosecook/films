"use strict";

let britinfo = require("../britinfo");

let cinemas = [
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003564.htm",
    name: "Barbican" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003562.htm",
    name: "BFI Southbank" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003744.htm",
    name: "Curzon Bloomsbury" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003905.htm",
    name: "Curzon Soho" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1004176.htm",
    name: "Electric Cinema" }
];

exports.listings = function(requestPromise, listing) {
  return Promise.all(cinemas.map((cinemaData) => {
    return britinfo.listings(requestPromise,
                             listing,
                             cinemaData.url,
                             cinemaData.name);
  }));
};
