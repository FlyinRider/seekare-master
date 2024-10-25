const mongoose = require('mongoose');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const UserVoteAnswer = require('../models/UserVoteAnswer');

/**
 * Post Answer
 */
exports.postAnswer = async (req, res) => {
  const { questionID, userID, content, isMdAssigned, mdReviewed } = req.body;
  try {
    const answer = await new Answer({
      questionID,
      userID,
      content
    })
      .save()
      .then((result) => result);

    if (isMdAssigned && mdReviewed) {
      await Question.updateOne(
        {
          _id: questionID
        },
        {
          mdResponse: mongoose.Types.ObjectId(answer._id),
          mdReviewed: true
        }
      );
    }

    res.status(200).json({
      answer
    });
  } catch (error) {
    res.status(403).json({
      error: 'Can not create answer'
    });
  }
};

exports.postReference = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { userID, books } = req.body;
    const referencedBooks = {};
    referencedBooks[userID] = books;
    const answer = await Answer.findOne({ _id: answerId });
    if (!answer) throw new Error('Not found answer');
    answer.referencedBooks = referencedBooks;
    await answer.save();
    // await Answer.updateOne({_id:answerId}, {referencedBooks})
    res.status(200).json({});
  } catch (error) {
    res.status(403).json({ error });
  }
};
/**
 * delete Answer Reference
 */
exports.deleteAnswerReference = async (req, res) => {
  try {
    const { answerID } = req.params;
    const { userID, activeWikiId } = req.body;
    const answer = await Answer.findOne({ _id: answerID });
    if (!answer) throw new Error('Not Found Question');
    const referencedBooks = answer.referencedBooks;
    const result = {};
    const books = Object.values(referencedBooks);
    const users = Object.keys(referencedBooks);
    for (let i = 0; i < books.length; i++) {
      let temp = [];
      for (let j = 0; j < books[i].length; j++) {
        if (books[i][j] !== activeWikiId) {
          temp.push(books[i][j]);
        }
      }
      result[users[i]] = temp;
    }
    answer.referencedBooks = result;
    await answer.save();
    res.status(200).json({});
  } catch (error) {
    res.status(403).json({ error });
  }
};
/**
 * Get Answers
 */
exports.getAnswers = async (req, res) => {
  const { questionID } = req.query;

  try {
    const resAs = await Answer.find({ questionID });

    let answers = [];
    for (const aItem of resAs) {
      const user = await aItem.getUser();
      answers.push({
        ...aItem.toJSON(),
        user: {
          userID: user._id,
          username: user.username
        }
      });
    }

    res.status(200).json({
      answers
    });
  } catch (error) {}
};

exports.getReferencedAnswers = async (req, res) => {
  const { activeWikiId } = req.params;
  const query = [];
  if (activeWikiId != undefined && activeWikiId != 'undefined') {
    query.push(
      {
        $lookup: {
          from: 'users',
          localField: 'userID',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          likes: 1,
          dislikes: 1,
          questionID: 1,
          userID: 1,
          content: 1,
          date: 1,
          user: {
            _id: 1,
            username: 1,
            email: 1
          },
          wikiSearch: { $objectToArray: '$referencedBooks' }
        }
      },
      { $unwind: '$wikiSearch' },
      {
        $match: {
          $and: [
            { 'wikiSearch.v': { $type: 'array' } },
            { 'wikiSearch.v': { $in: [activeWikiId] } }
          ]
        }
      }
    );
  }
  try {
    if (query.length > 0) {
      const answers = await Answer.aggregate(query);
      res.status(200).json({
        answers
      });
    }
  } catch (e) {
    console.log(e);
  }
};
/**
 * Vote Answer
 */
exports.vote = async (req, res) => {
  const { answerID } = req.params;
  const { vote, userID } = req.body;
  try {
    const answer = await Answer.findById(answerID);
    if (vote == 1) {
      if (
        Array.isArray(answer.likes) &&
        answer.dislikes.indexOf(userID) === -1
      ) {
        if (answer.likes.indexOf(userID) === -1) {
          answer.likes = [...answer.likes, userID];
        } else {
          const deletedLikes = [
            ...answer.likes.slice(0, answer.likes.indexOf(userID)),
            ...answer.likes.slice(answer.likes.indexOf(userID) + 1)
          ];
          answer.likes = [...deletedLikes];
        }
      } else {
        const deletedDislikes = [
          ...answer.dislikes.slice(0, answer.dislikes.indexOf(userID)),
          ...answer.dislikes.slice(answer.dislikes.indexOf(userID) + 1)
        ];
        answer.dislikes = [...deletedDislikes];
      }
    }
    if (vote == -1) {
      if (
        Array.isArray(answer.dislikes) &&
        answer.likes.indexOf(userID) === -1
      ) {
        if (answer.dislikes.indexOf(userID) === -1) {
          answer.dislikes = [...answer.dislikes, userID];
        } else {
          const deletedDislikes = [
            ...answer.dislikes.slice(0, answer.dislikes.indexOf(userID)),
            ...answer.dislikes.slice(answer.dislikes.indexOf(userID) + 1)
          ];
          answer.dislikes = [...deletedDislikes];
        }
      } else {
        const deletedLikes = [
          ...answer.likes.slice(0, answer.likes.indexOf(userID)),
          ...answer.likes.slice(answer.likes.indexOf(userID) + 1)
        ];
        answer.likes = [...deletedLikes];
      }
    }

    await answer.save();
    res.status(200).json({
      answer
    });
  } catch (error) {
    res.status(403).json({
      message: 'Can not vote this Answer'
    });
  }
};

/**
 * Update Answer
 */
exports.updateAnswer = async (req, res) => {
  const { answerID } = req.params;
  const { answer_data } = req.body;

  try {
    await Answer.updateOne(
      {
        _id: answerID
      },
      {
        content: answer_data.content,
        isShow: answer_data.isShow
      }
    );

    const updated_answer = await Answer.findById(answerID);

    res.status(200).json({
      updated_answer
    });
  } catch (error) {
    res.status(403).json({
      message: 'Can not update answer'
    });
  }
};

/**
 * Delete Answer
 */
exports.deleteAnswer = async (req, res) => {
  const { answerID } = req.params;

  try {
    await Answer.deleteOne({
      _id: answerID
    });

    res.status(200).json({
      message: 'Deleted successfully',
      answerID
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};
