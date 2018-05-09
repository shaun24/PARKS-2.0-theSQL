// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the available details
var AvailDetSchema = new Schema({
  name: {
    type: String,
    required: "Detail name is required"
  },
  facility: {
    type: String
  }
});

// create a model from the schema
var AvailDet = mongoose.model("AvailDet", AvailDetSchema);

// Export the Available Details model
module.exports = AvailDet;