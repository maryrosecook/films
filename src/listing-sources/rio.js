"use strict";

let moment = require("moment-timezone");
let _ = require("underscore");

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
  let showings = extractShowingsFromTree(data);
  setDatesOnShowings(showings);
  trimTitlesOnShowings(showings);
  return showings.map(function(showing) {
    return listing(showing.dateTime, showing.title, "Rio Cinema");
  });
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

function setDatesOnShowings(showings) {
  showings.forEach(function(showing) {
    let hoursMinutes = showing.time.match(/(\d{2})\:(\d{2})/);
    showing.dateTime = date(showing.dayIndex,
                            hoursMinutes[1],
                            hoursMinutes[2]);
  });
};

function trimTitlesOnShowings(showings) {
  showings.forEach(function(listing) {
    listing.title = listing.title.trim();
  });
};

function extractShowingsFromTree(data) {
  return data.reduce(function(showings, day) {
    day.films.forEach(function(film) {
      showings = showings.concat(film.showings)
    });

    return showings;
  }, []);
};


function date(index, hours, minutes) {
  return moment()
    .startOf("day")
    .add(index, "days")
    .hours(hours)
    .minutes(minutes);
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
