"use strict";

let fs = require("fs-extra");
let path = require("path");

const CINEMAS_PATH = path.join(__dirname, "./cinemas/");

function cinemas() {
  return fs.readdirSync(CINEMAS_PATH)
    .filter(function(cinemaFilename) {
      return cinemaFilename.match(/\.js$/);
    })
    .map(function(cinemaFilename) {
      return require(path.join(CINEMAS_PATH, cinemaFilename));
    });
};

module.exports = cinemas;
