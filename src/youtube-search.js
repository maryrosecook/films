"use strict";

require('dotenv').config();
let YouTube = require('youtube-node');

function youtubeSearch(query) {
  return new Promise(function(resolve, reject) {
    authenticatedInstance()
      .search(query, 1, function(err, response) {
        if (err || responseSearchResults(response).length === 0) {
          return reject("Couldn't get video");
        }

        resolve(youtubeUrlFromVideoId(
          searchResultVideoId(responseSearchResults(response)[0])));
      });
  });
};

function responseSearchResults(response) {
  return response.items;
};

function searchResultVideoId(result) {
  return result.id.videoId;
};

function youtubeUrlFromVideoId(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
};

function authenticatedInstance() {
  let youTube = new YouTube();
  youTube.setKey(process.env.YOUTUBE_API);
  return youTube;
};

module.exports = youtubeSearch;
