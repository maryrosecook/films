"use strict";

let moment = require("moment");

let listingFns = {
  date: function() {
    return moment(this.dateTime)
  }
};

function listing(dateTime, film, cinema) {
  var listing = Object.create(listingFns);
  listing.dateTime = moment(dateTime);
  listing.film = film;
  listing.cinema = cinema;
  return listing;
};

module.exports = listing;
