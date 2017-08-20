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
    name: "Electric Cinema" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1212336.htm",
    name: "Curzon Aldgate" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1004107.htm",
    name: "Genesis" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1000171.htm",
    name: "Vue Islington" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1131780.htm",
    name: "Rich Mix" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1176542.htm",
    name: "Hackney Picturehouse" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003766.htm",
    name: "Rio" },
  { url: "http://www.britinfo.net/cinema/cinema-listings-1003989.htm",
    name: "Picturehouse Central" }
];

exports.listings = function() {
  return Promise.all(cinemas.map((cinemaData) => {
    return britinfo.listings(cinemaData.url,
                             cinemaData.name);
  }));
};
