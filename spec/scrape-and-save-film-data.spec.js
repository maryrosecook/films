"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();
const _ = require("underscore");

describe("#scrapeAndSaveFilmData", function() {
  it("includes trailers for films", function(done) {
    let trailers = {
      Heat: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
    };

    let imdbFilmData = {
      Heat: {
        title: "Heat",
        rating: "8.2",
        metascore: "76",
        imdburl: "https://www.imdb.com/title/tt0113277"
      }
    };

    let write = sinon.stub();
    let scrapeAndSaveFilmData =
        proxyquire("../scripts/scrape-and-save-film-data", {
          "../src/scrape-trailers": sinon.stub().resolves(trailers),
          "../src/db": { write: write },
          "../src/scrape-imdb-film-data":
            sinon.stub().resolves(imdbFilmData)
        });

    scrapeAndSaveFilmData()
      .then(function() {
        expect(write.firstCall.args[1])
          .toEqual({
            Heat: _.extend({},
                           imdbFilmData["Heat"],
                           { trailer: trailers["Heat"] })
          })
        done();
      });
  });

  it("passes films into scrapeImdbFilmData", function() {
    let films = ["Heat"];
    let scrapeImdbFilmData = sinon.stub();
    let scrapeAndSaveFilmData =
        proxyquire("../scripts/scrape-and-save-film-data", {
          "../src/scrape-trailers": sinon.stub(),
          "../src/db": { write: sinon.stub() },
          "../src/scrape-imdb-film-data": scrapeImdbFilmData
        })(films);

    expect(scrapeImdbFilmData.getCall(0).args[0]).toEqual(films);
  });

  it("passes films into scrapeTrailers", function() {
    let films = ["Heat"];
    let scrapeTrailers = sinon.stub();
    let scrapeAndSaveFilmData =
        proxyquire("../scripts/scrape-and-save-film-data", {
          "../src/scrape-trailers": scrapeTrailers,
          "../src/db": { write: sinon.stub() },
          "../src/scrape-imdb-film-data": sinon.stub()
        })(films);

    expect(scrapeTrailers.getCall(0).args[0]).toEqual(films);
  });
});
