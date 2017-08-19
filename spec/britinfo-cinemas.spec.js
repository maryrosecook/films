"use strict";

const sinon = require("sinon");
const proxyquire = require("proxyquire");
const requestPromise = require("request-promise");

const listing = require("../src/listing");

const britinfoCinemas = require("../src/listing-sources/britinfo-cinemas");

describe("scraping all britinfo cinemas", function() {
  it("returns a single promise with all results", function(done) {
    let britinfo = { listings: sinon.stub() };
    let cinemaListings = proxyquire(
      "../src/listing-sources/britinfo-cinemas", {
        "../britinfo": britinfo
      }).listings;

    cinemaListings(requestPromise, listing)
      .then((results) => {
        expect(results.length).toEqual(6);
        done();
      });
  });

  describe("scrapes all britinfo cinemas", () => {
    let britinfo;

    beforeEach(function() {
      britinfo = { listings: sinon.stub() };
      let cinemaListings = proxyquire(
        "../src/listing-sources/britinfo-cinemas", {
          "../britinfo": britinfo
        }).listings;
      cinemaListings(requestPromise, listing);
    });

    it("scrapes Barbican", function() {
      expect(britinfo.listings.getCall(0).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1003564.htm",
          "Barbican"]);
    });

    it("scrapes BFI", function() {
      expect(britinfo.listings.getCall(1).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1003562.htm",
          "BFI Southbank"]);
    });

    it("scrapes Curzon Bloomsbury", function() {
      expect(britinfo.listings.getCall(2).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1003744.htm",
          "Curzon Bloomsbury"]);
    });

    it("scrapes Curzon Soho", function() {
      expect(britinfo.listings.getCall(3).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1003905.htm",
          "Curzon Soho"]);
    });

    it("scrapes BFI", function() {
      expect(britinfo.listings.getCall(4).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1004176.htm",
          "Electric Cinema"]);
    });

    it("scrapes Curzon Aldgate", function() {
      expect(britinfo.listings.getCall(5).args)
        .toEqual([
          requestPromise,
          listing,
          "http://www.britinfo.net/cinema/cinema-listings-1212336.htm",
          "Curzon Aldgate"]);
    });
  });
});
