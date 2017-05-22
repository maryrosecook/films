"use strict";

let path = require("path");

let sinon = require("sinon");
let proxyquire = require("proxyquire");

describe("#imdb-search", function() {
  it("returns details of film searched for", function(done) {
    let filmData = {
      title: 'Heat',
      year: 1995,
      director: 'Michael Mann',
      writer: 'Michael Mann',
      actors: 'Al Pacino, Robert De Niro',
      plot: 'Neil...',
      metascore: '76',
      rating: '8.2',
      imdburl: 'https://www.imdb.com/title/tt0113277'
    };

    let get = sinon.stub().resolves(filmData);
    let imdbSearch = proxyquire("../src/imdb-search", {
      "imdb-api": { get: get }
    });

    imdbSearch("heat").then((data) => {
      expect(data).toEqual(filmData);
      expect(get.getCall(0).args[0]).toEqual("heat");
      expect(get.getCall(0).args[1].apiKey).toBeDefined();
      done();
    });
  });

  it("returns undefined if film not found", function(done) {
    let imdbSearch = proxyquire("../src/imdb-search", {
      "imdb-api": { get: sinon.stub().rejects() }
    });

    imdbSearch("oethuoeth tothoeduoet oet uoethu").then((data) => {
      expect(data).toBeUndefined()
      done();
    });
  });
});
