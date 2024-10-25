const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLikeQuestionSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questionID: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  vote: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UserLikQuestion", userLikeQuestionSchema);
