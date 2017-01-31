"use strict";

let proxyquire = require("proxyquire");
let sinon = require("sinon");
let moment = require("moment");

describe("presentedListings", function() {
  describe("#prepare", function() {
    describe("grouping", function() {
      it("groups by date and then film", function() {
        let presentedListings = proxyquire(
          "../src/presented-listings", {
            "./load-film-data": sinon.stub().returns({})
          });

        let date = moment();
        let listingObjects = [{
          dateTime: date,
          film: "Margaret",
          cinema: "Rich Mix"
        }];

        let dates = presentedListings
            .prepare(listingObjects);

        expect(dates).toEqual([{
          date: date.format("dddd Do MMMM"),
          films: [{
            film: "Margaret",
            cinemas: [{
              cinema: "Rich Mix",
              listings: [{
                dateTime: date,
                film: "Margaret",
                cinema: "Rich Mix"
              }]
            }]
          }]
        }])
      });

      it("groups films by date", function() {
        let presentedListings = proxyquire(
          "../src/presented-listings", {
            "./load-film-data": sinon.stub().returns({})
          });

        let date1 = moment();
        let date2 = moment().add(1, "day");
        let listingObjects = [{
          dateTime: date1,
          film: "Margaret",
          cinema: "Rich Mix"
        }, {
          dateTime: date2,
          film: "Heat",
          cinema: "Rich Mix"
        }];

        let dates = presentedListings
            .prepare(listingObjects);

        expect(dates[0].date).toEqual(date1.format("dddd Do MMMM"));
        expect(dates[0].films[0].film).toEqual("Margaret");

        expect(dates[1].date).toEqual(date2.format("dddd Do MMMM"));
        expect(dates[1].films[0].film).toEqual("Heat");
      });
    });

    describe("sorting", function() {
      it("sorts date groups chronologically", function() {
        let presentedListings = proxyquire(
          "../src/presented-listings", {
            "./trailers": sinon.stub().returns({})
          });

        let date1 = moment();
        let date2 = moment().add(1, "day");
        let listingObjects = [
          { dateTime: date2, film: "Heat", cinema: "" },
          { dateTime: date1, film: "Heat", cinema: "" }
        ];

        let dates = presentedListings
            .prepare(listingObjects);

        expect(dates[0].date).toEqual(date1.format("dddd Do MMMM"));
        expect(dates[1].date).toEqual(date2.format("dddd Do MMMM"));
      });
    });

    describe("filtering listings", function() {
      it("omits listings before today", function() {
        let presentedListings = proxyquire(
          "../src/presented-listings", {
            "./trailers": sinon.stub().returns({})
          });

        let yesterday = moment().subtract(1, "day");
        let today = moment();
        let tomorrow = moment().add(1, "day");
        let listingObjects = [
          { dateTime: yesterday, film: "Heat", cinema: "" },
          { dateTime: today, film: "Heat", cinema: "" },
          { dateTime: tomorrow, film: "Heat", cinema: "" }
        ];

        let dates = presentedListings.prepare(listingObjects);

        expect(dates[0].date)
          .toEqual(today.format("dddd Do MMMM"));
        expect(dates[1].date)
          .toEqual(tomorrow.format("dddd Do MMMM"));
      });
    });

    describe("trailers", function() {
      it("adds trailer when one is known", function() {
        let filmData = {
          Margaret: {
            trailer: "https://www.youtube.com/watch?v=jx52F4iLTL8"
          }
        };

        let presentedListings =
            proxyquire("../src/presented-listings", {
              "./load-film-data": sinon.stub().returns(filmData)
            });

        let dates = presentedListings.prepare([
          { film: "Margaret", dateTime: moment() }
        ]);

        let filmListingsBlock = dates[0].films[0]

        expect(filmListingsBlock.film).toEqual("Margaret");
        expect(filmListingsBlock.trailer)
          .toEqual(filmData["Margaret"].trailer);
      });

      it("doesn't add trailer when one not known", function() {
        let trailerData = {};

        let presentedListings =
            proxyquire("../src/presented-listings", {
              "./trailers": sinon.stub().returns(trailerData)
            });

        let dates = presentedListings.prepare([
          { film: "Margaret", dateTime: moment() }
        ]);

        let filmListingsBlock = dates[0].films[0];

        expect(filmListingsBlock.film).toEqual("Margaret");
        expect(filmListingsBlock.trailer).toBeUndefined();
      });
    });

    describe("imdb film data", function() {
      it("adds data", function() {
        let imdbFilmData = {
          "Heat": {
            title: 'Heat',
            year: 1995,
            director: 'Michael Mann',
            writer: 'Michael Mann',
            actors: 'Al Pacino, Robert De Niro',
            plot: 'Neil...',
            metascore: '76',
            rating: '8.2',
            imdburl: 'https://www.imdb.com/title/tt0113277',
          }
        };

        let presentedListings =
            proxyquire("../src/presented-listings", {
              "./load-film-data": sinon.stub().returns(imdbFilmData)
            });

        let dates = presentedListings.prepare([
          { film: "Heat", dateTime: moment() }
        ]);

        let filmListingsBlock = dates[0].films[0]

        expect(filmListingsBlock.film).toEqual("Heat");
        expect(filmListingsBlock.director)
          .toEqual(imdbFilmData["Heat"].director);
        expect(filmListingsBlock.actors)
          .toEqual(imdbFilmData["Heat"].actors);
        expect(filmListingsBlock.plot)
          .toEqual(imdbFilmData["Heat"].plot);
        expect(filmListingsBlock.metascore)
          .toEqual(imdbFilmData["Heat"].metascore);
        expect(filmListingsBlock.rating)
          .toEqual(imdbFilmData["Heat"].rating);
        expect(filmListingsBlock.imdburl)
          .toEqual(imdbFilmData["Heat"].imdburl);
      });
    });
  });
});
