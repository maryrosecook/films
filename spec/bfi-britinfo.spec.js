"use strict";

let proxyquire = require("proxyquire");
let sinon = require("sinon");
let requestPromise = require("request-promise");

let listing = require("../src/listing");

describe("scraping bfi britinfo page", function() {
  it("gets gets listings from britinfo", function() {
    let britinfo = { listings: sinon.stub() };
    let cinemaListings = proxyquire(
      "../src/listing-sources/bfi-britinfo", {
        "./britinfo": britinfo
      }).listings;

    cinemaListings(requestPromise, listing);
    expect(britinfo.listings.firstCall.args)
      .toEqual([requestPromise,
                listing,
                "http://www.britinfo.net/cinema/cinema-listings-1003562.htm",
                "BFI Southbank"]);
  });
});
