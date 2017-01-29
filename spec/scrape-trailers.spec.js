"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();

describe("#scrapeTrailers", function() {
  it("saves scraped trailers to db", function(done) {
    let write = sinon.stub();
    let scrapeTrailers = proxyquire("../scripts/scrape-trailers", {
      "../src/listings": sinon.stub()
        .returns([{ film: "Margaret" }]),
      "../src/youtube": sinon.stub()
        .resolves("https://www.youtube.com/watch?v=7YAiS-3EhMI"),
      "../src/db": {
        write: write,
        read: sinon.stub().returns([{ film: "Margaret" }])
      }
    });

    scrapeTrailers()
      .then(function() {
        expect(write.firstCall.args[1])
          .toEqual({
            Margaret: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
          });
        done();
      })
  });

  it("saves trailers if some not found", function(done) {
    let write = sinon.stub();

    let youtube = sinon.stub();
    youtube.onCall(0).rejects("no");
    youtube.onCall(1)
      .resolves("https://www.youtube.com/watch?v=7YAiS-3EhMI");

    let scrapeTrailers = proxyquire("../scripts/scrape-trailers", {
      "../src/listings": sinon.stub().returns([
        { film: "Heat" },
        { film: "Margaret" }
      ]),
      "../src/youtube": youtube,
      "../src/db": {
        write: write,
        read: sinon.stub().returns([{ film: "Margaret" }])
      }
    });

    scrapeTrailers()
      .then(function() {
        expect(write.firstCall.args[1])
          .toEqual({
            Margaret: "https://www.youtube.com/watch?v=7YAiS-3EhMI"
          });
        done();
      })
  });
});
