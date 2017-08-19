"use strict";

let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let moment = require("moment");

let googleListingPages =
    require("../src/google-listing-pages");
let stringRequestPromise = require("./string-request-promise");

describe("#googleListingPageUrls", function() {
  let pages;
  beforeEach(function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/rio-day-1.html"),
      "utf8");

    let requestPromise = stringRequestPromise(pageContent);
    pages = googleListingPages(requestPromise, "rio cinema")
  });

  it("creates pages with urls for rio example", function(done) {
    pages.then((urls) => {
      expect(_.pluck(urls, "url"))
        .toEqual([
          "https://www.google.co.uk/search?q=rio cinema",
          "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTTNTTSNTbYxCTPxetaWpRfkKrvk5-Xkp-nxMV7ysjPSVTnyqy9Wkyl2ReYGAFNYD7vVgAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBUoADAA",
          "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTTNTTSNTbcxCTPxetaWpRfkKrvk5-Xkp-nxMV7ysjPSVTnyqy9Wkyl2ReYGAGvnbZiVgAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBYoATAA",
          "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTXNTAEok1M8ly8rqVF-QWp-j75eSn5eUpcvKeM_JxEda7M2qvFVJp9gYkRAHqKddlWAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBcoAjAA"
        ]);
      done();
    })
  });

  it("creates pages with dates: today, tomorrow...", function(done) {
    pages.then((urls) => {
      expect(_.pluck(urls, "date"))
        .toEqual([
          moment().startOf("day"),
          moment().startOf("day").add(1, "day"),
          moment().startOf("day").add(2, "days"),
          moment().startOf("day").add(3, "days")
        ]);
      done();
    })
  });
});
