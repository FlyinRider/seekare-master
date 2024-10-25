const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MapQuestionTag = require('./MapQuestionTag');
const Answer = require('./Answer');
const Tag = require('./Tag');
const User = require('./User');

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referencedBooks: {
    type: Object,
    default: {}
  },
  mdAssigned: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  mdResponse: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  mdReviewed: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Schema.Types.Array,
    default: []
  },
  dislikes: {
    type: Schema.Types.Array,
    default: []
  },
  // files: {
  //   type: Array,
  //   default: [],
  // },
  date: {
    type: Date,
    default: Date.now
  },
  banned: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'visible'
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

questionSchema.methods.getTags = async function () {
  const mapQuestionTags = await MapQuestionTag.find({
    questionID: this._id
  });

  const tagIDs = mapQuestionTags.map((map) =>
    mongoose.Types.ObjectId(map.tagID)
  );

  const tags = await Tag.find({
    _id: {
      $in: tagIDs
    }
  });

  return tags;
};

questionSchema.statics.getByTags = async function (tagIDs) {
  const mapQuestionTags = await MapQuestionTag.find({
    tagID: { $in: tagIDs }
  });
  const qIds = mapQuestionTags.map((item) =>
    mongoose.Types.ObjectId(item.questionID)
  );

  const resQs = await this.find({ _id: { $in: qIds } });

  return resQs;
};

questionSchema.statics.getNewQuestions = async function () {};

questionSchema.methods.getAnswers = async function () {
  return await mongoose.model('Answer').find({ questionID: this._id });
};

questionSchema.methods.getUser = async function () {
  return await mongoose.model('User').findById(this.userID);
};

questionSchema.methods.getByUserID = async function (userID) {
  return await this.find({ userID });
};

module.exports = mongoose.model('Question', questionSchema);
