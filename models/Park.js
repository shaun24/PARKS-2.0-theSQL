// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the parks
var ParkSchema = new Schema({
  name: {
    type: String,
    required: "Park name is required"
  },
  size: {
    type: Number
  },
  handiAccess: {
    type: Boolean,
    default: false
  },
  restrooms: {
    type: Number,
    required: "Number of restrooms is required"
  },
  address: {
    type: String,
    required: "Address is required"
  }
});

// create a model from the schema
var Park = mongoose.model("Park", ParkSchema);

// Export the Park model
module.exports = Park;