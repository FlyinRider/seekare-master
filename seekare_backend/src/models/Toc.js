const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tocSchema = new Schema({
  created: {
    type: String,
    required: false,
  },
  updated: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Toc", tocSchema);
