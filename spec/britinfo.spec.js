"use strict";

let moment = require("moment-timezone");
let fs = require("fs-extra");
let path = require("path");
let _ = require("underscore");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

let stringRequestPromise = require("./string-request-promise");

describe("scraping barbican britinfo page", function() {
  let britinfo;
  let listingsPromise;
  let url = "http://www.britinfo.net/cinema/cinema-listings-1003564.htm";
  let cinema = "Barbican";

  beforeAll(() => {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/barbican-britinfo.html"),
      "utf8");

    let britinfo = proxyquire("../src/britinfo", {
      "request-promise": stringRequestPromise(pageContent)
    });

    listingsPromise = britinfo.listings(url, cinema);
  });

  it("gets first time of first film", function(done) {
    listingsPromise.then(function(listings) {
      expect(listings[0].dateTime)
        .toEqual(moment("2017-04-11T20:15:00Z"));
      expect(listings[0].film)
        .toEqual("An Angel at My Table");

      done();
    });
  });

  it("gets two times for same date and film", function(done) {
    listingsPromise.then(function(listings) {
      expect(listings[9].dateTime)
        .toEqual(moment("2017-04-08T16:30:00Z"));
      expect(listings[9].film)
        .toEqual("I Am Not Your Negro");

      expect(listings[10].dateTime)
        .toEqual(moment("2017-04-08T20:45:00Z"));
      expect(listings[10].film)
        .toEqual("I Am Not Your Negro");

      done();
    });
  });

  it("adds cinema to listings", function(done) {
    listingsPromise.then(function(listings) {
      expect(listings[0].cinema).toEqual("Barbican");
      done();
    });
  });

  it("stores listing url", function(done) {
    listingsPromise.then(function(listings) {
      expect(_.first(listings).url).toEqual(url);
      done();
    });
  });
});
