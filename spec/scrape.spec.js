"use strict";

let fs = require("fs");
let path = require("path");

let scrape = require("../scrape.js");
let richMix = require("../cinemas/rich-mix.js");

function createRequestPromise(content) {
  return function() {
    return new Promise(function(resolve) {
      return resolve(content);
    });
  };
};

describe("#scrape", function() {
  iit("returns listings for two cinemas", function(done) {
    var pageHtml = fs.readFileSync(
      path.join(__dirname, "./pages/richmix.org.uk.html"), "utf8");

    var requestPromise = createRequestPromise(pageHtml);
    var cinemas = [richMix, richMix];

    scrape(cinemas, requestPromise)
      .then(function(listings) {
        expect(listings.length).toEqual(932);
        done();
      });
  });
});
