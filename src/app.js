var express = require("express");
var routeHandlers = require("./route-handlers");

function addMiddleware(app) {
  app.use(express.static('public'));
  return app;
};

function createApp() {
  return express();
};

function addRoutes(app) {
  return app
    .get("/", routeHandlers.index)
    .get("/listings", routeHandlers.listings);
};

function startApp(app) {
  var port = process.env.FILM_PORT || 4000;
  return app
    .set("port", port)
    .listen(port, function() {
      console.log("App is running on port", port);
    });
};

startApp(addMiddleware(addRoutes(createApp())));
