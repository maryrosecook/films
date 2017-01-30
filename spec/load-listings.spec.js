"use strict";

const moment = require("moment");
let sinon = require("sinon");
let proxyquire = require("proxyquire");

describe("#listings", function() {
  it("returns array of listings", function() {
    let jsonObjects = [{
      dateTime: "2016-12-20T11:00:00+00:00",
      film: "Margaret",
      cinema: "Rich Mix",
      url: "http://richmix.org/listings"
    }];

    let loadListings = proxyquire("../src/load-listings", {
      "../src/db": { read: sinon.stub().returns(jsonObjects) }
    });

    let listing = loadListings()[0];
    let jsonObject = jsonObjects[0];

    expect(listing.dateTime).toEqual(moment(jsonObject.dateTime));
    expect(listing.film).toEqual(jsonObject.film);
    expect(listing.cinema).toEqual(jsonObject.cinema);
    expect(listing.url).toEqual(jsonObject.url);
  });
});
