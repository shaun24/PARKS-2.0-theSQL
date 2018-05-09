// require the node modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// create the express app
const app = express();

// set application port
const PORT = process.env.PORT || 8080;

// require models for syncing
const db = require("./models");

// require routes
const routes = require("./routes");

// set up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/parksandrec";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});