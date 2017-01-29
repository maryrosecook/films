"use strict";

let sinon = require("sinon");
require("sinon-as-promised"); // adds promise methods to sinon

let proxyquire = require("proxyquire").noPreserveCache();

describe("#youtube", function() {
  it("sets key on youtube instance", function(done) {
    let setKey = sinon.stub();
    let youtube = proxyquire("../src/youtube", {
      "youtube-node": sinon.stub().returns({
        setKey: setKey,
        search: (_1, _2, cb) => {
          // force search to abort - only care about setKey
          // being called, which has already happened
          cb("error");
        }
      })
    });

    youtube().catch(() => {
      expect(setKey.firstCall.args[0].length > 0).toEqual(true)
      done();
    });
  });

  it("gives single url for a query", function(done) {
    let response = { items: [{ id: { videoId: '2GfZl4kuVNI' } }] };

    let youtube = proxyquire("../src/youtube", {
      "youtube-node": sinon.stub().returns({
        setKey: sinon.stub(),
        search: (query, maxResults, cb) => {
          expect(query).toEqual("heat trailer");
          expect(maxResults).toEqual(1);

          cb(null, response);
        }
      })
    });

    youtube("heat trailer")
      .then((result) => {
        expect(result)
          .toEqual("https://www.youtube.com/embed/2GfZl4kuVNI");
        done();
      })
  });
});
