const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapQuestionTagSchema = new Schema({
  questionID: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  tagID: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  },
});

module.exports = mongoose.model("MapQuestionTag", mapQuestionTagSchema);
