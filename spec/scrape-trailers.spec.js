"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();

describe("#scrapeTrailers", function() {
  it("saves scraped trailers to db", function(done) {
    let write = sinon.stub();
    let scrapeTrailers = proxyquire("../src/scrape-trailers", {
      "../src/saved-listing-film-names": sinon.stub()
        .returns(["Margaret"]),
      "../src/youtube": sinon.stub()
        .resolves("https://www.youtube.com/watch?v=7YAiS-3EhMI"),
      "../src/imdb-search": sinon.stub().resolves(true),
    });

    scrapeTrailers()
      .then(function(trailers) {
        expect(trailers)
          .toEqual({
            Margaret: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
          });
        done();
      })
  });

  it("saves trailers if some not found on youtube", function(done) {
    let write = sinon.stub();

    let youtube = sinon.stub();
    youtube.onCall(0).rejects("no");
    youtube.onCall(1)
      .resolves("https://www.youtube.com/watch?v=7YAiS-3EhMI");

    let scrapeTrailers = proxyquire("../src/scrape-trailers", {
      "../src/saved-listing-film-names": sinon.stub()
        .returns(["Heat", "Margaret"]),
      "../src/youtube": youtube,
      "../src/imdb-search": sinon.stub().resolves(true),
    });

    scrapeTrailers()
      .then(function(trailers) {
        expect(trailers)
          .toEqual({
            Margaret: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
          });
        done();
      })
  });

  it("doesn't search 4 trailers 4 films not on imdb", (done) => {
    let write = sinon.stub();
    let youtube = sinon.stub();
    let scrapeTrailers = proxyquire("../src/scrape-trailers", {
      "../src/saved-listing-film-names": sinon.stub()
        .returns(["oentuh onethu onteh untoehu"]),
      "../src/youtube": youtube,
      "../src/imdb-search": sinon.stub().resolves(undefined)
    });

    scrapeTrailers()
      .then(function(trailers) {
        expect(Object.keys(trailers).length).toEqual(0);
        expect(youtube.callCount).toEqual(0);
        done();
      })
  });
});
