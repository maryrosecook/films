"use strict";

let proxyquire = require("proxyquire");
let sinon = require("sinon");
const util = require("util");
let moment = require("moment");

describe("presentedListings", function() {
  describe("#prepare", function() {
    describe("grouping", function() {
      it("groups by date and then film", function() {
        let presentedListings = proxyquire(
          "../src/presented-listings", {
            "./trailers": sinon.stub().returns({
              Margaret: "https://www.youtube.com/watch?v=7YAiS-3E"
            })
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
            trailer: "https://www.youtube.com/watch?v=7YAiS-3E",
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
            "./trailers": sinon.stub().returns({})
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
        let trailerData = {
          Margaret: "https://www.youtube.com/watch?v=jx52F4iLTL8"
        };

        let presentedListings =
            proxyquire("../src/presented-listings", {
              "./trailers": sinon.stub().returns(trailerData)
            });

        let dates = presentedListings.prepare([
          { film: "Margaret", dateTime: moment() }
        ]);

        let filmListingsBlock = dates[0].films[0]

        expect(filmListingsBlock.film).toEqual("Margaret");
        expect(filmListingsBlock.trailer)
          .toEqual(trailerData["Margaret"]);
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

        let filmListingsBlock = dates[0].films[0]

        expect(filmListingsBlock.film).toEqual("Margaret");
        expect(filmListingsBlock.trailer).toBeUndefined();
      });
    });
  });
});
