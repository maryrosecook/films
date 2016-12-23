"use strict";

let cheerio = require("cheerio");

let proxyquire = require("proxyquire").noPreserveCache();
let listing = require("../src/listing");

describe("routeHandlers", function() {
  let requestMock, responseMock, listings;
  beforeEach(function() {
    requestMock = {
      query: {
        apiRequestURL: "http://apirequesturl.com"
      }
    };

    responseMock = jasmine.createSpyObj("response",
                                        ["json", "send"]);
    listings = [
      listing(new Date("2016-12-20T11:00:00+00:00"),
              "Margaret",
              "Rich Mix"),
      listing(new Date("2016-12-20T13:00:00+00:00"),
              "Heat",
              "Rich Mix")
    ];
  });

  describe("index", function() {
    it("sends html render of listings", function() {
      let db = {
        read: jasmine.createSpy("read").andReturn(listings)
      };

      let routeHandlers = proxyquire("../src/route-handlers", {
        "./db": db
      });

      routeHandlers.index(requestMock, responseMock);

      let sentHtml = responseMock.send.argsForCall[0][0];
      let $ = cheerio.load(sentHtml);
      let listingNodes = $(".listing");

      expect(listingNodes.length).toEqual(2);

      expect($(listingNodes[0]).find(".dateTime").text())
        .toEqual("Tue Dec 20 2016 11:00:00 GMT+0000");
      expect($(listingNodes[0]).find(".film").text())
        .toEqual("Margaret");
      expect($(listingNodes[0]).find(".cinema").text())
        .toEqual("Rich Mix");

      expect($(listingNodes[1]).find(".dateTime").text())
        .toEqual("Tue Dec 20 2016 13:00:00 GMT+0000");
      expect($(listingNodes[1]).find(".film").text())
        .toEqual("Heat");
      expect($(listingNodes[1]).find(".cinema").text())
        .toEqual("Rich Mix");
    });
  });

  describe("listings", function() {
    it("sends json of listings", function() {
      let db = {
        read: jasmine.createSpy("read").andReturn(listings)
      };

      let routeHandlers = proxyquire("../src/route-handlers", {
        "./db": db
      });

      routeHandlers.listings(requestMock, responseMock);

      expect(db.read.argsForCall[0][0]).toEqual("data");
      expect(responseMock.json)
        .toHaveBeenCalledWith(listings);
    });
  });
});
