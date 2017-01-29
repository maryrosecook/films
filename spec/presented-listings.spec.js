"use strict";

let moment = require("moment");

let presentedListings = require("../src/presented-listings");

describe("presentedListings", function() {
  describe("#presentedListings", function() {
    it("creates array of listings from object array", function() {
      let jsonObjects = [{
        dateTime: "2016-12-20T11:00:00+00:00",
        film: "Margaret",
        cinema: "Rich Mix",
        url: "http://richmix.org/listings"
      }];

      let listing = jasmine.createSpy("listing");
      presentedListings.fromJson(listing, jsonObjects);
      expect(listing).toHaveBeenCalledWith(jsonObjects[0].dateTime,
                                           jsonObjects[0].film,
                                           jsonObjects[0].cinema,
                                           jsonObjects[0].url);
    });
  });

  describe("#prepare", function() {
    it("groups by date and then film", function() {
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

      let dates = presentedListings
          .prepare(listingObjects);

      expect(dates[0].date).toEqual(date1.format("dddd Do MMMM"));
      expect(dates[0].films[0].film).toEqual("Margaret");

      expect(dates[1].date).toEqual(date2.format("dddd Do MMMM"));
      expect(dates[1].films[0].film).toEqual("Heat");
    });

    it("sorts date groups chronologically", function() {
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

    it("omits listings before today", function() {
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
});
