"use strict";

let cinemas = require("../src/cinemas");

describe("#cinemas", function() {
  it("returns array of things w/ cinema interface", function() {
    expect(cinemas().length > 0).toEqual(true);

    cinemas().forEach(function(cinema) {
      expect(cinema.pageContent).toBeDefined();
    });
  });
});
