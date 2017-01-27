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
  let url = "https://www.picturehouses.com/cinema/Hackney_Picturehouse/Whats_On";

  beforeEach(function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/hackney-picturehouse.html"),
      "utf8");
    requestPromise = hackneyPicturehouse.listings(
      stringRequestPromise(pageContent), listing);
  });

  it("gets first time of first film", function(done) {
    requestPromise.then(function(listings) {
      expect(listings[0].dateTime)
        .toEqual(moment("2016-12-27T21:10:00Z"));
      expect(listings[0].film)
        .toEqual("Paterson");

      done();
    });
  });

  it("gets last time of last film", function(done) {
    requestPromise.then(function(listings) {
      expect(_.last(listings).dateTime)
        .toEqual(moment("2017-08-09T19:00:00Z"));
      expect(_.last(listings).film)
        .toEqual("Rsc Live Titus Andronicus");

      done();
    });
  });

  it("adds cinema to listings", function(done) {
    requestPromise.then(function(listings) {
      expect(listings[0].cinema).toEqual("Hackney Picturehouse");
      done();
    });
  });

  it("stores listing url", function(done) {
    requestPromise.then(function(listings) {
      expect(_.first(listings).url).toEqual(url);
      done();
    });
  });
});
