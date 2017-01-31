"use strict";

let path = require("path");

let sinon = require("sinon");
let proxyquire = require("proxyquire");

describe("#loadFilmData", function() {
  it("returns object mapping films to film data", function() {
    let filmData = [{
      Cameraperson: "https://www.youtube.com/embed/2GfZl4kuVNI",
      imdburl: "https://imdb.com/..."
    }];

    let db = { read: sinon.stub().returns(filmData) };

    let loadFilmData = proxyquire("../src/load-film-data", {
      "../src/db": db
    });

    expect(loadFilmData()).toEqual(filmData);

    expect(db.read.firstCall.args[0])
      .toEqual(path.join(__dirname, "..", "data", "films.json"));
  });
});
