module.exports = function createRequestPromise(content) {
  return function() {
    return new Promise(function(resolve) {
      return resolve(content);
    });
  };
};
