"use strict";

let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let hackneyPicturehouse =
    require("../src/listing-sources/hackney-picturehouse");
let listing = require("../src/listing");
let stringRequestPromise = require("./string-request-promise");

describe("scraping hackney picturehouse", function() {
  let requestPromise;
  beforeEach(function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/hackney-picturehouse.html"),
      "utf8");
    requestPromise = hackneyPicturehouse.listings(
      stringRequestPromise(pageContent), listing);
  });

  it("gets first time of first film", function(done) {
    requestPromise.then(function(listings) {
      expect(listings[0])
        .toEqual(listing("2016-12-27T21:10:00Z",
                         "Paterson [15]",
                         "Hackney Picturehouse"));
      done();
    });
  });

  it("gets last time of last film", function(done) {
    requestPromise.then(function(listings) {
      expect(_.last(listings))
        .toEqual(listing("2017-08-09T19:00:00Z",
                         "RSC Live: Titus Andronicus [12A]",
                         "Hackney Picturehouse"));
      done();
    });
  });
});
