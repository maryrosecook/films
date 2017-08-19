"use strict";

let cheerio = require("cheerio");
let moment = require("moment-timezone");

let listing = require("./listing");

function googlePageListings(pageContent, date, cinema) {
  var $ = cheerio.load(pageContent);
  return allTimes($)
    .map(function(timeNode) {
      return listing(dateTime($, timeNode, date),
                     filmTitle($, timeNode),
                     cinema);
    });
};

function allTimes($) {
  return $("._wxj").toArray();
};

function filmTitle($, timeNode) {
  return $(timeNode).closest("tr").prev().text();
};

function dateTime($, timeNode, date) {
  let dateStr = date.format("YYYY-MM-DD");
  let timeStr = $(timeNode).text();
  return `${dateStr}T${timeStr}:00Z`;
};

module.exports = googlePageListings;
