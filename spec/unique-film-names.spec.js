"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

let uniqueFilmNames = require("../src/unique-film-names");

describe("#uniqueFilmNames", function() {
  it("returns array of unique films", function() {
    let listings = [
      { film: "Margaret" },
      { film: "Margaret" },
      { film: "Heat" }
    ];

    let films = uniqueFilmNames(listings);
    expect(films[0]).toEqual("Margaret");
    expect(films[1]).toEqual("Heat");
  });
});
