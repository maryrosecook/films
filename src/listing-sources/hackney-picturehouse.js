"use strict";

let cheerio = require("cheerio");
let moment = require("moment");
let _ = require("underscore");

function formatUrlDate(dateObj) {
  return moment(dateObj).format("YYYY-MM-DD");
};

function url(startDateObj) {
  return "https://www.picturehouses.com/cinema/Hackney_Picturehouse/Whats_On";
};

function pageContent(requestPromise) {
  return requestPromise(url(Date.now()));
};

function listings(pageContent, listing) {
  var $ = cheerio.load(pageContent);
  return allDateTimes($)
    .map(function(timeNode) {
      return listing(dateTime($, timeNode),
                     filmTitle($, timeNode),
                     "Hackney Picturehouse");
    });
};

function allDateTimes($) {
  return $(".btn-xs").toArray();
};

function filmTitle($, timeNode) {
  return $(timeNode)
    .closest(".col-xs-12")
    .find("h2 a")
    .text();
};

function dateTime($, timeNode) {
  let timeStr = extractTime($, timeNode);
  let dateWithoutHyphensStr =
      extractDateWithoutHyphensStr($, timeNode);
  var zoneStr = moment().format("Z");

  var d = dateWithoutHyphensStr;
  let dateWithHyphensStr =
      `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;

  return `${dateWithHyphensStr}T${timeStr}:00${zoneStr}`;
};

function extractDateWithoutHyphensStr($, timeNode) {
  return $(timeNode)
      .closest(".col-xs-12")
      .find(".nav-collapse")
      .attr("id")
      .match(/listings-further-ahead-([^-]*)/)[1];
};

function extractTime($, timeNode) {
  return $(timeNode).text().trim().replace(".", ":");
};

module.exports = {
  pageContent,
  listings,
  url
};
