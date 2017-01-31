"use strict";

let fs = require("fs-extra");
let path = require("path");

let mustache = require("mustache");
let moment = require("moment-timezone");

let db = require("./db");
let loadListings = require("./load-listings");
let presentedListings = require("./presented-listings");

const LISTINGS_PATH = path.relative(
  process.cwd(),
  path.join(__dirname, "../data", "listings.json"));

const indexTemplate = loadTemplate(templatePath("index.mustache"));
const filmInfoPartial =
      loadTemplate(templatePath("film-info.mustache"));
const listingsPartial =
      loadTemplate(templatePath("listings.mustache"));


function indexHandler(request, response) {
  moment.tz.setDefault("Europe/London");
  response.send(mustache.render(indexTemplate, {
    dates: presentedListings.prepare(
      loadListings())
  }, {
    filmInfo: filmInfoPartial,
    listings: listingsPartial
  }));
};

function listingsHandler(request, response) {
  response.json(db.read(LISTINGS_PATH));
};

function templatePath(templateFilename) {
  return path.relative(
    process.cwd(),
    path.join(__dirname, "../views/", templateFilename)
  );
};

function loadTemplate(templateFilepath) {
  return fs.readFileSync(templateFilepath, "utf8");
};

module.exports = {
  index: indexHandler,
  listings: listingsHandler
};
