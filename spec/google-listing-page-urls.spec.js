"use strict";

let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let googleListingPageUrls =
    require("../src/listing-sources/google-listing-page-urls");
let stringRequestPromise = require("./string-request-promise");

describe("#googleListingPageUrls", function() {
  it("gets all pages for rio example", function(done) {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/rio-day-1.html"),
      "utf8");

    let requestPromise = stringRequestPromise(pageContent);
    googleListingPageUrls(requestPromise, "rio cinema")
      .then((urls) => {
        expect(urls)
          .toEqual([
            "https://www.google.co.uk/search?q=rio cinema",
            "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTTNTTSNTbYxCTPxetaWpRfkKrvk5-Xkp-nxMV7ysjPSVTnyqy9Wkyl2ReYGAFNYD7vVgAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBUoADAA",
            "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTTNTTSNTbcxCTPxetaWpRfkKrvk5-Xkp-nxMV7ysjPSVTnyqy9Wkyl2ReYGAGvnbZiVgAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBYoATAA",
            "https://www.google.co.uk/search?ie=UTF-8&q=rio+cinema&stick=H4sIAAAAAAAAAOPgFeLWz9U3MDQszsswMk4SMTQxNrYwNDY2MTIxMTAxNTCwtDDI4jIyMDTXNTAEok1M8ly8rqVF-QWp-j75eSn5eUpcvKeM_JxEda7M2qvFVJp9gYkRAHqKddlWAAAA&hpkx=0&sa=X&ved=0ahUKEwjGwoG-jJnRAhWHdVAKHTqTAMcQyZQBCBcoAjAA"
          ]);
        done();
      })
  });
});
