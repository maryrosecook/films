"use strict";

let fs = require("fs-extra");
let path = require("path");

let scrape = require("../src/scrape.js");
let richMix = require("../src/cinemas/rich-mix.js");

function createRequestPromise(content) {
  return function() {
    return new Promise(function(resolve) {
      return resolve(content);
    });
  };
};

describe("#scrape", function() {
  it("returns listings for two cinemas", function(done) {
    var cinemas = [richMix, richMix];

    var pageHtml = fs.readFileSync(
      path.join(__dirname, "./pages/richmix.org.uk.html"), "utf8");
    var requestPromise = createRequestPromise(pageHtml);

    scrape(cinemas, requestPromise)
      .then(function(listings) {
        expect(listings.length).toEqual(932);
        done();
      });
  });
});
