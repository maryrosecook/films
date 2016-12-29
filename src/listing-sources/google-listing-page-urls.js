"use strict";

let cheerio = require("cheerio");

function googleListingPageUrls(requestPromise, cinemaName) {
  let initialUrl_ = initialUrl(cinemaName);
  return requestPromise(initialUrl_)
    .then((initialPage) => {
      return [initialUrl_].concat(
        listingPagePaths(initialPage)
          .map(googleUrl));
    });
};

function googleUrl(path) {
  return `https://www.google.co.uk${path}`;
};

function initialUrl(cinemaName) {
  return googleUrl(`/search?q=${cinemaName}`);
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

module.exports = googleListingPageUrls;
