"use strict";

let fs = require("fs-extra");
let path = require("path");

const proxyquire = require("proxyquire");
const sinon = require("sinon");

let scrapeListings = require("../src/scrape-listings.js");
const stringRequestPromise = require("./string-request-promise");

describe("#scrapeListings", function() {
  it("gets all listings", function() {
    let listingSource = { listings: sinon.stub() };
    scrapeListings([listingSource, listingSource]);
    expect(listingSource.listings.getCall(0).args.length).toEqual(0);
    expect(listingSource.listings.getCall(1).args.length).toEqual(0);
  });

  it("returns a single promise", function() {
    let listingSource = { listings: sinon.stub() };
    expect(scrapeListings([listingSource]).then).toBeDefined();
  });

  it("flattens listings", function(done) {
    let listingSource = { listings: sinon.stub().resolves([0, 1]) };
    scrapeListings([listingSource, listingSource])
      .then(function(listings) {
        expect(listings.length).toEqual(4);
        done();
      });
  });

  // fit("returns listings for two cinemas", function(done) {
  //   var pageHtml = fs.readFileSync(
  //     path.join(__dirname, "./pages/barbican-britinfo.html"), "utf8");

  //   const britinfo = proxyquire("../src/britinfo.js", {
  //     "request-promise": stringRequestPromise(pageHtml)
  //   });

  //   var cinemas = [britinfo, britinfo];

  //   scrapeListings(cinemas)
  //     .then(function(listings) {
  //       expect(listings.length).toEqual(78);
  //       done();
  //     });
  // });
});
