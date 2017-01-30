"use strict";

let fs = require("fs-extra");
let path = require("path");

let scrapeListings = require("../src/scrape-listings.js");
let rio = require("../src/listing-sources/rio.js");
const stringRequestPromise = require("./string-request-promise");

describe("#scrapeListings", function() {
  it("returns listings for two cinemas", function(done) {
    var cinemas = [rio, rio];

    var pageHtml = fs.readFileSync(
      path.join(__dirname, "./pages/rio.html"), "utf8");
    var requestPromise = stringRequestPromise(pageHtml);

    scrapeListings(cinemas, requestPromise)
      .then(function(listings) {
        expect(listings.length).toEqual(36);
        done();
      });
  });
});
