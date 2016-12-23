function listings(listing, jsonObjects) {
  return jsonObjects.map(function(obj) {
    return listing(obj.dateTime, obj.film, obj.cinema);
  });
};

function sort(listings) {
  return listings.sort(function(a, b) {
    return a.dateTime - b.dateTime;
  });
};

listings.sort = sort;

module.exports = listings;
