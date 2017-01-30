"use strict";

let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let richMix = require("../src/listing-sources/rich-mix");
let listing = require("../src/listing");
let stringRequestPromise = require("./string-request-promise");

describe("scraping rich mix", function() {
  describe("#listings", function() {
    let requestPromise;

    beforeAll(function() {
      let pageContent = fs.readFileSync(
        path.join(__dirname, "./pages/richmix.org.uk.html"),
        "utf8");
      requestPromise = richMix.listings(
        stringRequestPromise(pageContent), listing);
    });

    it("gets first film", function(done) {
      requestPromise.then(function(listings) {
        expect(listings[0].dateTime)
          .toEqual(moment("2016-12-20T11:00:00+00:00"));
        expect(listings[0].film)
          .toEqual("Rogue One A Star Wars Story");

        done();
      });
    });

    it("gets last film", function(done) {
      requestPromise.then(function(listings) {
        expect(_.last(listings).dateTime)
          .toEqual(moment("2017-02-16T19:00:00+00:00"));
        expect(_.last(listings).film)
          .toEqual("Nt Live Saint Joan");

        done();
      });
    });

    it("adds cinema to listings", function(done) {
      requestPromise.then(function(listings) {
        expect(listings[0].cinema).toEqual("Rich Mix");
        done();
      });
    });

    it("adds url to listings", function(done) {
      requestPromise.then(function(listings) {
        expect(listings[0].url)
          .toMatch(/https:\/\/www\.richmix\.org\.uk/);
        done();
      });
    });
  });
});
