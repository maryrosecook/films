"use strict";

let fs = require("fs-extra");
let path = require("path");

let db = require("../src/db");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILENAME = "data.json";
const DATA_FILEPATH = path.join(DATA_DIR, DATA_FILENAME);

const listings = JSON.stringify([{ name: "Mary" }]);

describe("db", function() {
  describe("write and read", function() {
    beforeEach(function() {
      if (fs.existsSync(DATA_DIR)) {
        fs.emptyDirSync(DATA_DIR);
        fs.rmdirSync(DATA_DIR);
      }
    });

    it("writes data when no data folder", function() {
      db.write(DATA_DIR, listings);
      expect(db.read(DATA_DIR)).toEqual(listings);
    });

    it("writes data when data folder already there", function() {
      db.write(DATA_DIR, listings);
      expect(fs.existsSync(DATA_DIR)).toEqual(true);
      db.write(DATA_DIR, listings);
      expect(db.read(DATA_DIR)).toEqual(listings);
    });

    it("returns empty array when no data file", function() {
      expect(fs.existsSync(DATA_DIR)).toEqual(false);
      expect(db.read(DATA_DIR)).toEqual([]);
    });
  });
});
