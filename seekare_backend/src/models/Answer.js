const mongoose = require('mongoose');
const Question = require('./Question');
const Schema = mongoose.Schema;
const User = require('./User');

const answerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionID: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  referencedBooks: {
    type: Object,
    default: {}
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Schema.Types.Array,
    default: []
  },
  dislikes: {
    type: Schema.Types.Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  isShow: {
    type: Boolean
  }
});

answerSchema.methods.getUser = async function () {
  return await User.findById(this.userID);
};

answerSchema.methods.getQuestion = async function () {
  return await Question.findById(this.questionID);
};

module.exports = mongoose.model('Answer', answerSchema);
