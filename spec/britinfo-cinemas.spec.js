"use strict";

const sinon = require("sinon");
const proxyquire = require("proxyquire");

const britinfoCinemas = require("../src/listing-sources/britinfo-cinemas");

describe("scraping all britinfo cinemas", function() {
  it("returns a single promise with all results", function() {
    let britinfo = { listings: sinon.stub() };
    let cinemaListings = proxyquire(
      "../src/listing-sources/britinfo-cinemas", {
        "../britinfo": britinfo,
      }).listings();

    expect(cinemaListings.then).toBeDefined();
  });

  describe("scrapes all britinfo cinemas", () => {
    let britinfo;

    beforeEach(function() {
      britinfo = { listings: sinon.stub() };

      proxyquire(
        "../src/listing-sources/britinfo-cinemas", {
          "../britinfo": britinfo
        }).listings();
    });

    it("scrapes Barbican", function() {
      expect(britinfo.listings.getCall(0).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003564.htm",
          "Barbican"]);
    });

    it("scrapes BFI", function() {
      expect(britinfo.listings.getCall(1).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003562.htm",
          "BFI Southbank"]);
    });

    it("scrapes Curzon Bloomsbury", function() {
      expect(britinfo.listings.getCall(2).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003744.htm",
          "Curzon Bloomsbury"]);
    });

    it("scrapes Curzon Soho", function() {
      expect(britinfo.listings.getCall(3).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003905.htm",
          "Curzon Soho"]);
    });

    it("scrapes BFI", function() {
      expect(britinfo.listings.getCall(4).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1004176.htm",
          "Electric Cinema"]);
    });

    it("scrapes Curzon Aldgate", function() {
      expect(britinfo.listings.getCall(5).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1212336.htm",
          "Curzon Aldgate"]);
    });

    it("scrapes Genesis", function() {
      expect(britinfo.listings.getCall(6).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1004107.htm",
          "Genesis"]);
    });

    it("scrapes Vue Islington", function() {
      expect(britinfo.listings.getCall(7).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1000171.htm",
          "Vue Islington"]);
    });

    it("scrapes Rich Mix", function() {
      expect(britinfo.listings.getCall(8).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1131780.htm",
          "Rich Mix"]);
    });

    it("scrapes Hackney Picturehouse", function() {
      expect(britinfo.listings.getCall(9).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1176542.htm",
          "Hackney Picturehouse"]);
    });

    it("scrapes Rio", function() {
      expect(britinfo.listings.getCall(10).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003766.htm",
          "Rio"]);
    });

    it("scrapes Picturehouse Central", function() {
      expect(britinfo.listings.getCall(11).args)
        .toEqual([
          "http://www.britinfo.net/cinema/cinema-listings-1003989.htm",
          "Picturehouse Central"]);
    });
  });
});
