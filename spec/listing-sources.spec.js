"use strict";

let listingSources = require("../src/listing-sources");

describe("#listingSources", function() {
  let sources;
  beforeAll(() => {
    sources = listingSources();
  });

  it("includes britinfo cinemas", function() {
    expect(sources[0])
      .toEqual(require("../src/listing-sources/britinfo-cinemas"));
  });
});
