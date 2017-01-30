"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

const listing = require("../src/listing");

describe("#scrapeImdbFilmData", function() {
  fit("scrapes data for all film names", function(done) {
    let scrapeImdbFilmData =
        proxyquire("../src/scrape-imdb-film-data", {
          "../src/saved-listing-film-names": sinon.stub().returns([
            "Heat", "Margaret"
          ]),
          "../src/imdb-search": sinon.stub().returns({
            title: "Heat",
            rating: "8.2",
            metascore: "76",
            imdburl: "https://www.imdb.com/title/tt0113277"
          })
        });

    scrapeImdbFilmData()
      .then((filmData) => {
        expect(filmData[0].title).toEqual("Heat");
        expect(filmData[0].rating).toEqual("8.2");
        expect(filmData[0].metascore).toEqual("76");
        expect(filmData[0].imdburl)
          .toEqual("https://www.imdb.com/title/tt0113277");

        done();
      });
  });
});
