"use strict";

let fs = require("fs-extra");
let path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILENAME = "data.json";
const DATA_FILEPATH = path.join(DATA_DIR, DATA_FILENAME);

function read() {
  initDataDirIfNotPresent();
  return JSON.parse(fs.readFileSync(DATA_FILEPATH));
};

function write(listings) {
  initDataDirIfNotPresent();
  fs.writeFileSync(DATA_FILEPATH, JSON.stringify(listings));
};

function initDataDirIfNotPresent() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
};


module.exports = {
  read,
  write
};
