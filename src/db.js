"use strict";

let fs = require("fs-extra");
let path = require("path");

let encodeData = JSON.stringify;
let decodeData = JSON.parse;
let readData = fs.readFileSync;
let writeData = fs.writeFileSync;

function read(dataFilepath) {
  if (!dataFileExists(dataFilepath)) {
    return [];
  }

  return decodeData(readData(dataFilepath));
};

function write(dataFilepath, listings) {
  initDataDirIfNotPresent(dataFilepath);
  writeData(dataFilepath, encodeData(listings));
};

function initDataDirIfNotPresent(dataFilepath) {
  let dataFileDir = path.dirname(dataFilepath);
  if (!fs.existsSync(dataFileDir)) {
    fs.mkdirSync(dataFileDir);
  }
};

function dataFileExists(dataFilepath) {
  return fs.existsSync(dataFilepath);
};

module.exports = {
  read,
  write
};
