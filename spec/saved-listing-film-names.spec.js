"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

const listing = require("../src/listing");

describe("#savedListingFilmNames", function() {
  it("returns array of unique films", function() {
    let listings = [
      { film: "Margaret" },
      { film: "Margaret" },
      { film: "Heat" }
    ];

    let savedListingFilmNames =
        proxyquire("../src/saved-listing-film-names", {
          "../src/load-listings": sinon.stub().returns(listings)
        });

    let films = savedListingFilmNames(listing);
    expect(films[0]).toEqual("Margaret");
    expect(films[1]).toEqual("Heat");
  });
});
