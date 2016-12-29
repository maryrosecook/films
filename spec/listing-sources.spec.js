"use strict";

let listingSources = require("../src/listing-sources");

describe("#listingSources", function() {
  it("returns array listingSources", function() {
    expect(listingSources().length > 0).toEqual(true);

    listingSources().forEach(function(listingSource) {
      expect(listingSource.listings).toBeDefined();
    });
  });
});
