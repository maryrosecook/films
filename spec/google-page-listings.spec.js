"use strict";

let fs = require("fs-extra");
let path = require("path");

let moment = require("moment");
let _ = require("underscore");

let googlePageListings =
    require("../src/listing-sources/google-page-listings");
let listing = require("../src/listing");

describe("#googlePageListings", function() {
  it("parses all listings in passed rio page", function() {
    let pageContent = fs.readFileSync(
      path.join(__dirname, "./pages/rio-day-1.html"),
      "utf8");

    let date = moment("2016-12-20T00:00:00Z");
    let cinema = "Rio Cinema";

    let listings = googlePageListings(pageContent, date, cinema);

    expect(listings.length).toEqual(3);

    expect(listings[0]).toEqual(listing(
      "2016-12-20T17:30:00Z",
      "Fantastic Beasts and Where to Find Them",
      cinema));

    expect(_.last(listings)).toEqual(listing(
      "2016-12-20T14:30:00Z",
      "Kubo and the Two Strings",
      cinema));
  });
});
