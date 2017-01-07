"use strict";

let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let listings =
    require("../src/listing-sources/rio");
let listing = require("../src/listing");
let stringRequestPromise = require("./string-request-promise");

describe("scraping rio", function() {
  let requestPromise;
  beforeEach(function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/rio.html"),
      "utf8");
    requestPromise = listings.listings(
      stringRequestPromise(pageContent), listing);
  });

  it("gets first time of first film", function(done) {
    requestPromise.then(function(listings) {
      expect(listings[0])
        .toEqual(listing(moment()
                           .startOf("day")
                           .hours("14")
                           .minutes("00"),
                         "Trolls",
                         "Rio Cinema"));
      done();
    });
  });

  it("gets last time of last film", function(done) {
    requestPromise.then(function(listings) {
      expect(_.last(listings))
        .toEqual(listing(moment()
                         .startOf("day")
                           .add(6, "days")
                           .hours("20")
                           .minutes("15"),
                         "Silence",
                         "Rio Cinema"));
      done();
    });
  });
});
