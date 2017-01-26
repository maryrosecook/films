"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

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

  describe("listings", function() {
    it("sends json of listings", function() {
      let db = {
        read: jasmine.createSpy("read").and.returnValue(listings)
      };

      let routeHandlers = proxyquire("../src/route-handlers", {
        "./db": db
      });

      routeHandlers.listings(requestMock, responseMock);

      expect(db.read.calls.argsFor(0)[0]).toEqual("data");
      expect(responseMock.json)
        .toHaveBeenCalledWith(listings);
    });
  });

  describe("index", function() {
    it("sets timezone", function() {
      let setDefault = sinon.stub();
      let routeHandlers = proxyquire("../src/route-handlers", {
        "moment-timezone": { tz: { setDefault: setDefault } }
      });

      routeHandlers.index(requestMock, responseMock);
      expect(setDefault.firstCall.args[0]).toEqual("Europe/London");
    });

    it("responds with something (anything at all)", function() {
      let routeHandlers = require("../src/route-handlers");

      routeHandlers.index(requestMock, responseMock);

      expect(typeof responseMock.send.calls.argsFor(0)[0] ===
             "string")
        .toEqual(true);
    });
  });
});
