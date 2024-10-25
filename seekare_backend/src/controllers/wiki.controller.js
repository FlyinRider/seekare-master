const mongoose = require('mongoose');
const Tag = require('../models/Tag');
const Wiki = require('../models/Wiki');
const Category = require('../models/Category');

const list = [];
const timer = setInterval(async () => {
  await actionPerform();
}, 1000);
/**
 * Get all Wiki
 */
async function actionPerform() {
  if (list.length > 0) {
    const action = list.pop();
    if (action.updateWiki !== undefined) {
      updateWikiFunc(action);
    } else updateQuestionToWikiFunc(action);
  } else return;
}

exports.getWikiData = async (req, res) => {
  try {
    const { key } = req.query;

    const $regex = new RegExp(key, 'i');

    const queryParams = {};
    if (key) {
      queryParams.$or = [
        { title: $regex },
        { content: $regex },
        {
          'questions.title': $regex
        },
        {
          'questions.content': $regex
        }
      ];
    }

    const wiki = await Wiki.find(queryParams)
      .collation({ locale: 'en' })
      .sort({ title: 1 });

    res.status(200).json(wiki);
  } catch (error) {
    res.status(403).json({
      status: 403,
      error
    });
  }
};
/**
 * Get Wiki by tag
 */
exports.getWikiByTagId = async (req, res) => {
  const { tagId } = req.params;

  try {
    const tag = await Tag.findById(mongoose.Types.ObjectId(tagId));
    const wiki = await Wiki.findById(mongoose.Types.ObjectId(tag.wiki));

    res.status(200).json({
      status: 200,
      data: {
        tagId,
        wiki
      }
    });
  } catch (error) {
    res.status(403).json({
      status: 403,
      error
    });
  }
};
/**
 * Get Wiki by tag
 */
exports.getWikiById = async (req, res) => {
  const { wikiId } = req.params;
  try {
    const wiki = await Wiki.findById(mongoose.Types.ObjectId(wikiId));
    res.status(200).json(wiki);
  } catch (error) {
    res.status(403).json({
      status: 403,
      error
    });
  }
};
/**
 * Create Wiki
 */
exports.createWiki = async (req, res) => {
  let { activeWikiId, params } = req.body;
  if (params == undefined) {
    params = req.body;
  }
  try {
    const existingWikis = await Wiki.find({ title: params.title });
    if (existingWikis && existingWikis.length > 0) {
      return res.status(201).json({
        status: 201,
        existingWikis,
        message: 'Wiki is already existing'
      });
    } else {
      const wiki = await new Wiki(params).save();
      let tag = '';
      if (activeWikiId !== 'new-wiki') {
        tag = await Tag.updateOne({ _id: activeWikiId }, { wiki: wiki._id });
      }
      res.status(200).json({
        status: 200,
        tag,
        wiki
      });
    }
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Update Wiki
 */
exports.updateWiki = async (req, res) => {
  const { wikiId, params } = req.body;
  list.push({ updateWiki: { wikiId, params, res } });
};
const updateWikiFunc = async (action) => {
  const { wikiId, params, res } = action.updateWiki;
  try {
    // const wiki = await Wiki.updateMany({ _id: mongoose.Types.ObjectId(wikiId)}, {$set: params});
    const wiki = await Wiki.findOne({ _id: wikiId });
    if (wiki) {
      wiki.content = params.content;
      wiki.title = params.title;
      await wiki.save();
    }

    res.status(200).json();
  } catch (error) {
    res.status(403).json({
      status: 403,
      error
    });
  }
};

/**
 * Delete Wiki
 */
exports.deleteWiki = async (req, res) => {
  const { wikiId } = req.params;
  console.log(wikiId)
  try {
    await Wiki.deleteOne({
      _id: mongoose.Types.ObjectId(wikiId)
    });
    await Tag.updateOne({ wiki: wikiId }, { wiki: null });

    res.status(200).json({
      status: 200
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};
const hasSameObjectId = (objId, chkId) => {
  return String(objId) === String(chkId);
};

const getQuestionById = (questions, id) => {
  const quiz = questions.find((q) => hasSameObjectId(q._id, id));
  if (!quiz) {
    throw new Error("Doesn' exist such as question which has same Id");
  }
  return quiz;
};

exports.updateQuestionToWiki = async (req, res) => {
  const { wikiId } = req.params;
  const { title, content, type, id: quizId } = req.body;
  list.push({
    updateQuestion: { wikiId, title, content, type, id: quizId, res }
  });
};

//
const updateQuestionToWikiFunc = async (action) => {
  const {
    wikiId,
    title,
    content,
    type,
    id: quizId,
    res
  } = action.updateQuestion;
  try {
    if (!wikiId) throw new Error('Wiki Id Param does not valid');
    if (!title || !content || !type) throw new Error('Param does not valid');
    const wiki = await Wiki.findOne({ _id: wikiId });
    if (!wiki) throw new Error('Wiki Id Param does not valid');

    //  append new question
    if (!quizId) {
      const questions = wiki._doc.questions || [];
      const update_data = {
        ...wiki._doc,
        questions: [
          ...questions,
          {
            _id: mongoose.Types.ObjectId(),
            title,
            content,
            type
          }
        ]
      };
      await Wiki.updateOne({ _id: wikiId }, update_data);
      return res.status(201).json('success');
    } else {
      // update a question
      const questions = wiki._doc.questions || [];
      const quiz = getQuestionById(questions, quizId);

      const update_data = {
        ...wiki._doc,
        questions: [
          ...questions.filter((q) => !hasSameObjectId(q._id, quiz._id)),
          {
            _id: quiz._id,
            title,
            content,
            type
          }
        ]
      };
      await Wiki.updateOne({ _id: wikiId }, update_data);
      return res.status(201).json('success');
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
};

// delete
exports.deleteQuestionToWiki = async (req, res) => {
  try {
    const { wikiId, quizId } = req.params;

    if (!wikiId) throw new Error('Wiki Id Param does not valid');
    if (!quizId) throw new Error('Wiki Quiz Param does not valid');

    const wiki = await Wiki.findOne({ _id: wikiId });
    if (!wiki) throw new Error("Doesn' exist such as Wiki which has same Id");

    const questions = wiki._doc.questions || [];
    const quiz = getQuestionById(questions, quizId);
    const update_data = {
      ...wiki._doc,
      questions: questions.filter((q) => !hasSameObjectId(q._id, quiz._id))
    };
    await Wiki.updateOne({ _id: wikiId }, update_data);
    return res.status(200).json('success');
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};

exports.updateQuestionCategories = async (req, res) => {
  try {
    const { wikiId } = req.params;
    let { categories } = req.body;
    if (categories === undefined) {
      categories = [...JSON.parse(req.body.category)];
    }
    let wiki = await Wiki.findOne({ _id: wikiId });
    if (wiki) {
      console.log(categories);
      await Wiki.updateOne({ _id: wikiId }, { categories });
      wiki = await Wiki.findOne({ _id: wikiId });
      return res.status(200).json(wiki._doc);
    }
    throw new Error('Not found Wiki');
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};
