"use strict";

let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let richMix = require("../src/listing-sources/rich-mix");
let listing = require("../src/listing");
let stringRequestPromise = require("./string-request-promise");

describe("scraping rich mix", function() {
  describe("#url", function() {
    it("should create full-listing URL", function() {
      expect(richMix.url(moment("2016-12-20")))
        .toEqual("https://www.richmix.org.uk/events/type/Film/2016-12-20/2017-03-20/next-week");
    });
  });

  describe("#listings", function() {
    let requestPromise;
    beforeEach(function() {
      let pageContent = fs.readFileSync(
        path.join(__dirname, "./pages/richmix.org.uk.html"),
        "utf8");
      requestPromise = richMix.listings(
        stringRequestPromise(pageContent), listing);
    });

    it("gets first time of first film", function(done) {
      requestPromise.then(function(listings) {
        expect(listings[0])
          .toEqual(listing("2016-12-20T11:00:00+00:00",
                           "Rogue One: A Star Wars Story 2D",
                           "Rich Mix"));
        done();
      });
    });

    it("gets last time of last film", function(done) {
      requestPromise.then(function(listings) {
        expect(_.last(listings))
          .toEqual(listing("2017-02-16T19:00:00+00:00",
                           "NT Live: Saint Joan",
                           "Rich Mix"));
        done();
      });
    });
  });
});
