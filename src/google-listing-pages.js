"use strict";

let cheerio = require("cheerio");
let moment = require("moment-timezone");

function googleListingPages(requestPromise, cinemaName) {
  let initialUrl_ = initialUrl(cinemaName);
  return requestPromise(initialUrl_)
    .then((initialPage) => {
      return [createPage(initialUrl_, 0)].concat(
        listingPagePaths(initialPage)
          .map(googleUrl)
          .map((page, i) => {
            return createPage(page, i + 1);
          }));
    });
};

function googleUrl(path) {
  return `https://www.google.co.uk${path}`;
};

function initialUrl(cinemaName) {
  return googleUrl(`/search?q=${cinemaName}`);
};

function createPage(url, index) {
  return {
    url: url,
    date: moment().startOf("day").add(index, "days")
  };
};

function listingPagePaths(initialPage) {
  let $ = cheerio.load(initialPage);
  return listingPageNodes($).map((linkNode) => {
    return $(linkNode).attr("href");
  });
};

function listingPageNodes($) {
  return $("._S5j a.fl").toArray();
};

module.exports = googleListingPages;
