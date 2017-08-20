"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

const listing = require("../src/listing");

describe("#scrapeImdbFilmData", function() {
  it("scrapes data for all film names", function(done) {
    let scrapeImdbFilmData =
        proxyquire("../src/scrape-imdb-film-data", {
          "../src/imdb-search": sinon.stub().returns({
            title: "Heat",
            rating: "8.2",
            metascore: "76",
            imdburl: "https://www.imdb.com/title/tt0113277"
          })
        });

    scrapeImdbFilmData(["Heat", "Margaret"])
      .then((filmData) => {
        let heat = filmData["Heat"];
        expect(heat.title).toEqual("Heat");
        expect(heat.rating).toEqual("8.2");
        expect(heat.metascore).toEqual("76");
        expect(heat.imdburl)
          .toEqual("https://www.imdb.com/title/tt0113277");

        done();
      });
  });
});
