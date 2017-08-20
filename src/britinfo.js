"use strict";

let cheerio = require("cheerio");
let moment = require("moment-timezone");
let _ = require("underscore");
const requestPromise = require("request-promise");

let listing = require("./listing");

function pageContent(requestPromise, url) {
  return requestPromise(url);
};

function listings(url, cinema) {
  return pageContent(requestPromise, url)
    .then(_.partial(extractListings, listing, url, cinema));
};

function extractListings(listing, url, cinema, pageContent) {
  var $ = cheerio.load(pageContent);
  return _.chain(allFilms($))
    .map(function(filmNode) {
      var title = filmTitle($, filmNode);
      return dateTimes($, filmNode)
        .map((dateTime) => {
          return listing(dateTime,
                         title,
                         cinema,
                         url)
        });
    })
    .flatten()
    .value();
};

function allFilms($) {
  return $("td+ td").toArray();
};

function dateTimes($, filmNode) {
  return _.chain(dateAndTimeLines($, filmNode))
    .map(lineToDateTimes)
    .flatten()
    .value();
};

// eg
// An Angel At My Table
// Friday 7th April to Thursday 13th April
// Tuesday 11th April: 20:15
// Show: Price
function dateAndTimeLines($, node) {
  var datesAndOtherStuff = $(node)
      .html()
      .split("<br>");

  return _.chain(datesAndOtherStuff)
    .drop(2) // drop title and date range
    .initial(1) // drop price
    .value();
};

// eg "Saturday 8th April: 16:30, 20:45"
function lineToDateTimes(line) {
  var combinableDateStr =
      moment(line.split(":")[0],
             "dddd D MMMM")
      .format("YYYY-MM-DD");

  var timeStrs = line.split(":").slice(1).join(":").split(",");
  return timeStrs.map(function(timeStr) {
    return moment(`${combinableDateStr}T${timeStr.trim()}:00Z`);
  });
};


function filmTitle($, node) {
  return $(node)
    .find("b")
    .text();
};

module.exports = {
  listings
};
