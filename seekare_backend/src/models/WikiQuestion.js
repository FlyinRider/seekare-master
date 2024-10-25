const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wikiQuestionSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
});

wikiQuestionSchema.static('deleteById', (id, cb) => {
  this.remove({ _id: ObjectId(id) }, () => {
    const wikis = this.find();
    cb(wikis);
  });
});

wikiQuestionSchema.static('getWikiQuestions', async () => {
  return await this.find({
    wiki: { $ne: null },
  });
});

wikiQuestionSchema.methods.getQuestionWiki = async () => {
  const wiki = mongoose.model('WikiQuestion').findById(this.id);
  return wiki;
};

module.exports = mongoose.model('WikiQuestion', wikiQuestionSchema);
