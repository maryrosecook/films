"use strict";

let fs = require("fs-extra");
let path = require("path");

let mustache = require("mustache");

let db = require("./db");

const dataDir = path.relative(process.cwd(),
                              path.join(__dirname, "../data"));

const indexTemplate = template("index.mustache");

function index(request, response) {
  let listings = db
      .read(dataDir)
      .sort(function(a, b) { return a - b; });
  response.send(mustache.render(indexTemplate, { listings }));
};

function listings(request, response) {
  response.json(db.read(dataDir));
};

function template(templateFilename) {
  return fs.readFileSync(path.relative(
    process.cwd(),
    path.join(__dirname, "../views/", templateFilename)
  ), "utf8");
};

module.exports = {
  index,
  listings
};
