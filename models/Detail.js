// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the details for the facilities
var DetailSchema = new Schema({
  name: {
    type: String,
    required: "Detail name is required"
  },
  quantity: {
    type: Number,
    default: 0
  },
  facility: {
    type: String
  }
});

// create a model from the schema
var Detail = mongoose.model("Detail", DetailSchema);

// Export the Detail model
module.exports = Detail;