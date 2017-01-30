"use strict";

let path = require("path");

let sinon = require("sinon");
let proxyquire = require("proxyquire");

describe("#trailers", function() {
  it("returns object mapping films to trailer urls", function() {
    let trailerData = [{
      "Cameraperson": "https://www.youtube.com/embed/2GfZl4kuVNI"
    }];

    let db = { read: sinon.stub().returns(trailerData) };

    let loadTrailers = proxyquire("../src/load-trailers", {
      "../src/db": db
    });

    expect(loadTrailers()).toEqual(trailerData);

    expect(db.read.firstCall.args[0])
      .toEqual(path.join(__dirname, "..", "data", "trailers.json"));
  });
});
