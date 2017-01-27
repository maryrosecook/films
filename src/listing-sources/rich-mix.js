"use strict";

let cheerio = require("cheerio");
let moment = require("moment-timezone");
let _ = require("underscore");

function formatUrlDate(dateObj) {
  return moment(dateObj).format("YYYY-MM-DD");
};

function url() {
  let startDateObj = Date.now();
  let base = "https://www.richmix.org.uk/events/type/Film/";
  let startDate = formatUrlDate(startDateObj);
  let endDate = formatUrlDate(moment(startDateObj)
                              .add(3, "months"));
  return `${base}${startDate}/${endDate}/next-week`;
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
  return allDateTimes($)
    .map(function(timeNode) {
      return listing(dateTime($, timeNode),
                     filmTitle($, timeNode),
                     "Rich Mix",
                     url());
    });
};

function allDateTimes($) {
  return $(".date-display-single").toArray();
};

function filmTitle($, timeNode) {
  return $(timeNode).closest("article").find("h2 a").text();
};

function dateTime($, timeNode) {
  return $(timeNode).attr("content");
};

module.exports = {
  listings
};
