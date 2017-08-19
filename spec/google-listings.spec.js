"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let moment = require("moment");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");

let googleListings =
    require("../src/google-listings");
let listing = require("../src/listing");

describe("scraping listings for the rio", function() {
  describe("#listings", function() {
    let listingPages,
        pageListings,
        requestPromise,
        listing,
        returnedListings,
        listingsToReturn = ["listing1", "listing2"];
    beforeEach(function() {
      listingPages = sinon.stub().resolves([
        { url: "url1", date: moment().startOf("day") },
        { url: "url2", date: moment().startOf("day").add(1, "day") }
      ]);

      requestPromise = sinon.stub().resolves("some html");
      pageListings = sinon.stub().resolves(listingsToReturn);

      let pageContent = fs.readFileSync(
        path.join(__dirname, "./pages/richmix.org.uk.html"),
        "utf8");
      returnedListings = googleListings(listingPages,
                                        pageListings,
                                        requestPromise,
                                        listing,
                                        "Rio Cinema");
    });

    it("gets page listing URLs", function() {
      expect(listingPages.firstCall.args)
        .toEqual([requestPromise, "Rio Cinema"]);
    });

    it("requests page listing URLs", function(done) {
      returnedListings.then(function() {
        expect(requestPromise.getCall(0).args[0]).toEqual("url1");
        expect(requestPromise.getCall(1).args[0]).toEqual("url2");
        done();
      })
    });

    it("calls pageListings for each page", function(done) {
      returnedListings.then(function() {
        expect(pageListings.getCall(0).args)
          .toEqual(["some html",
                    moment().startOf("day"),
                    "Rio Cinema"]);

        expect(pageListings.getCall(1).args)
          .toEqual(["some html",
                    moment().startOf("day").add(1, "day"),
                    "Rio Cinema"]);

        done();
      })
    });

    it("flattens listings into array", function(done) {
      returnedListings.then(function(listings) {
        returnedListings.then((listings) => {
          expect(listings)
            .toEqual(listingsToReturn.concat(listingsToReturn));
          done();
        });
      })
    });
  });
});
