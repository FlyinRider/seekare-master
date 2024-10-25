const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tocVisitedSchema = new Schema({
  visited: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("tocvisits", tocVisitedSchema);
