"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

let savedListingFilmNames = require("../src/saved-listing-film-names");

describe("#savedListingFilmNames", function() {
  it("returns array of unique films", function() {
    let listings = [
      { film: "Margaret" },
      { film: "Margaret" },
      { film: "Heat" }
    ];

    let films = savedListingFilmNames(listings);
    expect(films[0]).toEqual("Margaret");
    expect(films[1]).toEqual("Heat");
  });
});
