"use strict";

let moment = require("moment");

let listings = require("../src/listings");

describe("listings", function() {
  describe("#listings", function() {
    it("creates array of listings from object array", function() {
      let jsonObjects = [{
        dateTime: "2016-12-20T11:00:00+00:00",
        film: "Margaret",
        cinema: "Rich Mix"
      }];

      let listing = jasmine.createSpy("listing");
      listings(listing, jsonObjects);
      expect(listing).toHaveBeenCalledWith(jsonObjects[0].dateTime,
                                           jsonObjects[0].film,
                                           jsonObjects[0].cinema);
    });
  });

  describe("#groupByDateAndFilm", function() {
    it("groups by date and then film", function() {
      let date = moment();
      let listingObjects = [{
        dateTime: date,
        film: "Margaret",
        cinema: "Rich Mix"
      }];

      let dates = listings
          .groupByDateAndFilm(listingObjects);

      expect(dates).toEqual([{
        date: date.format("dddd Do MMMM"),
        films: [{
          film: "Margaret",
          listings: [{
            dateTime: date,
            film: "Margaret",
            cinema: "Rich Mix"
          }]
        }]
      }])
    });

    it("groups films by date", function() {
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

      let dates = listings
          .groupByDateAndFilm(listingObjects);

      expect(dates[0].date).toEqual(date1.format("dddd Do MMMM"));
      expect(dates[0].films[0].film).toEqual("Margaret");

      expect(dates[1].date).toEqual(date2.format("dddd Do MMMM"));
      expect(dates[1].films[0].film).toEqual("Heat");
    });
  });
});
