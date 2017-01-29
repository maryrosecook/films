"use strict";

let sinon = require("sinon");
let proxyquire = require("proxyquire");

let listings = require("../src/listings");

describe("#listings", function() {
  it("returns array of listings", function() {
    let jsonObjects = [{
      dateTime: "2016-12-20T11:00:00+00:00",
      film: "Margaret",
      cinema: "Rich Mix",
      url: "http://richmix.org/listings"
    }];

    let listings = proxyquire("../src/listings", {
      "../src/db": { read: sinon.stub().returns(jsonObjects) }
    });

    let listing = jasmine.createSpy("listing");
    listings(listing);
    expect(listing).toHaveBeenCalledWith(jsonObjects[0].dateTime,
                                         jsonObjects[0].film,
                                         jsonObjects[0].cinema,
                                         jsonObjects[0].url);
  });
});
