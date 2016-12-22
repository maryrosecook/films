"use strict";

let fs = require("fs");
let path = require("path");

let db = require("../src/db");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILENAME = "data.json";
const DATA_FILEPATH = path.join(DATA_DIR, DATA_FILENAME);

const listings = JSON.stringify([{ name: "Mary" }]);

describe("db", function() {
  describe("#write", function() {
    beforeEach(function() {
      if (fs.existsSync(DATA_DIR)) {
        fs.rmdirSync(DATA_DIR);
      }
    });

    it("writes data when no data folder", function() {
      db.write(listings);
      expect(db.read()).toEqual(listings);
    });
  });
});
