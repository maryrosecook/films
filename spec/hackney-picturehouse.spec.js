"use strict";

let requestPromise = require("request-promise");
let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let hackneyPicturehouse =
    require("../src/listing-sources/hackney-picturehouse");
let listing = require("../src/listing");

describe("scraping hackney picturehouse", function() {
  let listings;
  beforeEach(function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/hackney-picturehouse.html"),
      "utf8");
    listings = hackneyPicturehouse.listings(pageContent, listing);
  });

  it("gets first time of first film", function() {
    expect(listings[0])
      .toEqual(listing("2016-12-27T21:10:00+00:00",
                       "Paterson [15]",
                       "Hackney Picturehouse"));
  });

  it("gets last time of last film", function() {
    expect(_.last(listings))
      .toEqual(listing("2017-08-09T19:00:00+00:00",
                       "RSC Live: Titus Andronicus [12A]",
                       "Hackney Picturehouse"));
  });
});
