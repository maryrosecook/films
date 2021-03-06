"use strict";

let moment = require("moment-timezone");
let titleCase = require("titlecase");

const DAY_START_HOURS = 8;
const NIGHT_START_HOURS = 18;

let listingFns = {
  time: function() {
    return this.dateTime.format("HH:mm");
  },

  partOfDay: function() {
    let todayDayStart = this.dateTime
        .clone()
        .hours(DAY_START_HOURS);

    let todayNightStart = this.dateTime
        .clone()
        .hours(NIGHT_START_HOURS);

    if (this.dateTime.isAfter(todayDayStart) &&
        this.dateTime.isBefore(todayNightStart)) {
      return "day"
    } else {
      return "night";
    }
  }
};

function listing(dateTime, film, cinema, url) {
  var listing = Object.create(listingFns);
  listing.dateTime = moment(dateTime);
  listing.film = titleCase(remove2d3d(film));
  listing.cinema = cinema;
  listing.url = url;
  return listing;
};

function remove2d3d(film) {
  return film
    .replace("2D", "")
    .replace("3D", "")
};

module.exports = listing;
