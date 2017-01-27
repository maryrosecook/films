"use strict";

let moment = require("moment");

let listing = require("../src/listing");

describe("#listing", function() {
  it("creates listing w/ dateTime, film, cinema, url", function() {
    let listingObj = listing("2016-12-20T11:00:00+00:00",
                             "Margaret",
                             "Rich Mix",
                             "http://hackney.com/listings");
    expect(listingObj.dateTime)
      .toEqual(moment("2016-12-20T11:00:00+00:00"));
    expect(listingObj.film).toEqual("Margaret");
    expect(listingObj.cinema).toEqual("Rich Mix");
    expect(listingObj.url).toEqual("http://hackney.com/listings");
  });
});
