"use strict";

let listingSources = require("../src/listing-sources");

describe("#listingSources", function() {
  let sources;
  beforeAll(() => {
    sources = listingSources();
  });

  fit("includes hackney picturehouse", function() {
    expect(sources[0])
      .toEqual(require("../src/listing-sources/hackney-picturehouse"));
  });

  fit("includes rich mix", function() {
    expect(sources[1])
      .toEqual(require("../src/listing-sources/rich-mix"));
  });

  fit("includes rio", function() {
    expect(sources[2])
      .toEqual(require("../src/listing-sources/rio"));
  });

  fit("includes britinfo cinemas", function() {
    expect(sources[3])
      .toEqual(require("../src/listing-sources/britinfo-cinemas"));
  });
});
