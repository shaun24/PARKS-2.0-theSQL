// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the facilities within the park
var FacilitySchema = new Schema({
  name: {
    type: String,
    required: "Facility name is required"
  },
  lighted: {
    type: Boolean,
    default: false
  },
  indoor: {
    type: Boolean,
    default: false
  },
  covered: {
    type: Boolean,
    default: false
  },
  park: {
    type: String
  }
});

// create a model from the schema
var Facility = mongoose.model("Facility", FacilitySchema);

// Export the Facility model
module.exports = Facility;