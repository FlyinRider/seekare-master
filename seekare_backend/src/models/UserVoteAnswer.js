const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVoteAnswerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  answerID: {
    type: Schema.Types.ObjectId,
    ref: "Answer",
  },
  vote: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UserVoteAnswer", userVoteAnswerSchema);
