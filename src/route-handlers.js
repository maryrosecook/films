"use strict";

let fs = require("fs-extra");
let path = require("path");

let mustache = require("mustache");

let db = require("./db");
let listing = require("./listing");
let listings = require("./listings");

const dataDir = path.relative(process.cwd(),
                              path.join(__dirname, "../data"));

const indexTemplate = template("index.mustache");

function indexHandler(request, response) {
  response.send(mustache.render(indexTemplate, {
    films: listings.groupByFilm(
      listings.sort(listings(listing, db.read(dataDir))))
  }));
};

function listingsHandler(request, response) {
  response.json(db.read(dataDir));
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
