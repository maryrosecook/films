"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();

describe("#scrapeFilms", function() {
  it("includes trailers for films", function(done) {
    let films = {
      Margaret: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
    };

    let write = sinon.stub();
    let scrapeAndSaveFilmData =
        proxyquire("../scripts/scrape-and-save-film-data", {
          "../src/scrape-trailers": sinon.stub().resolves(films),
          "../src/db": { write: write }
        });

    scrapeAndSaveFilmData()
      .then(function(inFilms) {
        expect(write.firstCall.args[1]).toBe(films);
        done();
      });
  });
});
