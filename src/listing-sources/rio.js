"use strict";

let moment = require("moment");
let _ = require("underscore");
let titleCase = require("title-case");

let artoo = require('artoo-js');
let cheerio = require('cheerio');
artoo.bootstrap(cheerio);

function url() {
  return "https://riocinema.org.uk/RioCinema.dll/Home";
};

function pageContent(requestPromise) {
  return requestPromise(url());
};

function listings(requestPromise, listing) {
  return pageContent(requestPromise)
    .then(_.partial(extractListings, listing));
};

function extractListings(listing, pageContent) {
  var $ = cheerio.load(pageContent);
  let data = extractRawData($);
  setDayIndicesOnShowings(data);
  setTitlesOnShowings(data);
  let listings = extractListingsFromTree(data);
  setDatesOnListings(listings);
  trimTitlesOnListings(listings);
  titleCaseTitlesOnListings(listings);
};

function setDayIndicesOnShowings(data) {
  data.forEach(function(day, i) {
    day.films.forEach(function(film) {
      film.showings.forEach(function(showing) {
        showing.dayIndex = i;
      });
    });
  });
};

function setTitlesOnShowings(data) {
  data.forEach(function(day, i) {
    day.films.forEach(function(film) {
      film.showings.forEach(function(showing) {
        showing.title = film.title;
      });
    });
  });
};

function setDatesOnListings(listings) {
  listings.forEach(function(listing) {
    listing.date = date(listing.dayIndex);
  });
};

function trimTitlesOnListings(listings) {
  listings.forEach(function(listing) {
    listing.title = listing.title.trim();
  });
};

function titleCaseTitlesOnListings(listings) {
  listings.forEach(function(listing) {
    listing.title = titleCase(listing.title);
  });
};

function extractListingsFromTree(data) {
  return data.reduce(function(listings, day) {
    day.films.forEach(function(film) {
      listings = listings.concat(film.showings)
    });

    return listings;
  }, []);
};


function date(index) {
  return moment().startOf("day").add(index, "days");
};

function extractRawData($) {
  return $("div.grid.small > #this-week").scrape({
    films: {
      scrape: {
        iterator: "li",
        data: {
          title: { sel: ".eventTitle" },
          showings: {
            scrape: {
              iterator: "small",
              data: {
                time: {}
              }
            }
          }
        }
      }
    }
  });
};

module.exports = {
  listings
};
