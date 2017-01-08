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

  describe("#groupByFilm", function() {
    it("groups listings by film", function() {
      let listingObjects = [{
        dateTime: moment(),
        film: "Margaret",
        cinema: "Rich Mix"
      }, {
        dateTime: moment(),
        film: "Heat",
        cinema: "Rich Mix"
      }, {
        dateTime: moment(),
        film: "Margaret",
        cinema: "ICA"
      }];

      let groupedListings = listings.groupByFilm(listingObjects);

      expect(groupedListings[0].film).toEqual("Margaret");
      expect(groupedListings[0].listings[0].cinema)
        .toEqual("Rich Mix");
      expect(groupedListings[0].listings[1].cinema)
        .toEqual("ICA");
    });
  });
});
