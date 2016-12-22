"use strict";

let fs = require("fs-extra");
let path = require("path");

const DATA_FILENAME = "data.json";

let encodeData = JSON.stringify;
let decodeData = JSON.parse;
let readData = fs.readFileSync;
let writeData = fs.writeFileSync;

function read(dataDir) {
  if (!dataFileExists(dataDir)) {
    return [];
  }

  return decodeData(readData(dataFilepath(dataDir)));
};

function write(dataDir, listings) {
  initDataDirIfNotPresent(dataDir);
  writeData(dataFilepath(dataDir), encodeData(listings));
};

function initDataDirIfNotPresent(dataDir) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

function dataFileExists(dataDir) {
  return fs.existsSync(dataDir) &&
    fs.existsSync(dataFilepath(dataDir));
};

function dataFilepath(dataDir) {
  return path.join(dataDir, DATA_FILENAME);
};

module.exports = {
  read,
  write
};
