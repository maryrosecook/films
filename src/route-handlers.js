"use strict";

let fs = require("fs-extra");
let path = require("path");

let mustache = require("mustache");
let moment = require("moment-timezone");

let db = require("./db");
let listing = require("./listing");
let listings = require("./listings");

const LISTINGS_PATH = path.relative(
  process.cwd(),
  path.join(__dirname, "../data", "listings.json"));

const indexTemplate = template("index.mustache");

function indexHandler(request, response) {
  moment.tz.setDefault("Europe/London");
  response.send(mustache.render(indexTemplate, {
    dates: listings.prepare(
      listings.fromJson(listing, db.read(LISTINGS_PATH)))
  }));
};

function listingsHandler(request, response) {
  response.json(db.read(LISTINGS_PATH));
};

function template(templateFilename) {
  return fs.readFileSync(path.relative(
    process.cwd(),
    path.join(__dirname, "../views/", templateFilename)
  ), "utf8");
};

module.exports = {
  index: indexHandler,
  listings: listingsHandler
};
