"use strict";

require('dotenv').config();
let YouTube = require('youtube-node');

function youtube(query) {
  return new Promise(function(resolve, reject) {
    authenticatedInstance()
      .search(query, 1, function(err, response) {
        if (err || responseSearchResults(response).length === 0) {
          return reject("Couldn't get trailer");
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

module.exports = youtube;
