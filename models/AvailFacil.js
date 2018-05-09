// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the available facilities
var AvailFacilSchema = new Schema({
  name: {
    type: String,
    required: "Detail name is required"
  }
});

// create a model from the schema
var AvailFacil = mongoose.model("AvailFacil", AvailFacilSchema);

// Export the Available Facilities model
module.exports = AvailFacil;