"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();

describe("scrape-listings", function() {
  it("saves scraped listings to db", function(done) {
    let listings = [];
    let write = sinon.stub();
    let scrape = proxyquire("../scripts/scrape-and-save-listings", {
      "../src/listing-sources": sinon.stub(),
      "../src/scrape-listings": sinon.stub().resolves(listings),
      "../src/db": { write: write }
    });

    scrape()
      .then(function() {
        expect(write.firstCall.args[1]).toBe(listings);
        done();
      })
  });
});
