"use strict";

let fs = require("fs-extra");
let path = require("path");

let scrapeListings = require("../src/scrape-listings.js");
let richMix = require("../src/listing-sources/rich-mix.js");
const stringRequestPromise = require("./string-request-promise");


describe("#scrapeListings", function() {
  it("returns listings for two cinemas", function(done) {
    var cinemas = [richMix, richMix];

    var pageHtml = fs.readFileSync(
      path.join(__dirname, "./pages/richmix.org.uk.html"), "utf8");
    var requestPromise = stringRequestPromise(pageHtml);

    scrapeListings(cinemas, requestPromise)
      .then(function(listings) {
        expect(listings.length).toEqual(932);
        done();
      });
  });
});
