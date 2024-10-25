const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const keyword_extractor = require('keyword-extractor');

const queryKeywordSchema = new Schema({
  userId: {
    type: String,
    default: 'anonymous',
  },
  keyword: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const addKeyword = async (keyword, addCount, userId) => {
  try {
    const findUserId = userId || 'anonymous';
    console.log(`findUserId`, findUserId);
    const queryResList = await mongoose.model('QueryKeyword').find({
      userId: findUserId,
      keyword,
    });

    if (queryResList && queryResList.length === 1) {
      const queryRes = queryResList[0];
      const updateRes = await mongoose.model('QueryKeyword').updateOne(
        {
          _id: mongoose.Types.ObjectId(queryRes._id),
        },
        {
          count: queryRes.count + addCount,
        }
      );
      return true;
    } else {
      const createRes = await mongoose.model('QueryKeyword').create({
        userId: findUserId,
        keyword,
        count: addCount,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

const getKeywordsFromContent = (content) => {
  const extraction_result = keyword_extractor.extract(content, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false,
  });
  const keyword_res = {};

  for (let key of extraction_result) {
    if (key in keyword_res) {
      keyword_res[key] = keyword_res[key] + 1;
    } else {
      keyword_res[key] = 1;
    }
  }
  return Object.entries(keyword_res);
};

queryKeywordSchema.statics.addSearchHistory = async function (
  sentence,
  userId
) {
  //
  const results = getKeywordsFromContent(sentence);
  console.log(results)
  const res = await Promise.all(
    results.map(async ([keyword, count]) => addKeyword(keyword, count, userId))
  );
  return true;
};

module.exports = mongoose.model('QueryKeyword', queryKeywordSchema);
