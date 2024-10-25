const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wikiSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  questions: {
    type: Array,
    required: false,
  },
  categories: {
    type: Array,
    required: false,
  },
});

wikiSchema.static('deleteById', (id, cb) => {
  this.remove({ _id: ObjectId(id) }, () => {
    const wikis = this.find();
    cb(wikis);
  });
});

wikiSchema.static('getWikis', async () => {
  return await this.find({
    wiki: { $ne: null },
  });
});

wikiSchema.methods.getWiki = async () => {
  const wiki = mongoose.model('Wiki').findById(this.id);
  return wiki;
};

module.exports = mongoose.model('Wiki', wikiSchema);
