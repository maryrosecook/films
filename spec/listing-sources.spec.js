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

  it("includes hackney picturehouse", function() {
    expect(sources[1])
      .toEqual(require("../src/listing-sources/hackney-picturehouse"));
  });

  it("includes rich mix", function() {
    expect(sources[2])
      .toEqual(require("../src/listing-sources/rich-mix"));
  });

  it("includes rio", function() {
    expect(sources[3])
      .toEqual(require("../src/listing-sources/rio"));
  });
});
