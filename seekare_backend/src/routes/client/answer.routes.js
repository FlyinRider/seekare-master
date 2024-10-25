const express = require('express');
const router = express.Router();

const answerController = require('../../controllers/answer.controller');

router
  .route('/')
  .post(answerController.postAnswer)
  .get(answerController.getAnswers);

router.route('/:activeWikiId').get(answerController.getReferencedAnswers);
router.route('/:answerID/vote').post(answerController.vote);
router.route('/:answerID').patch(answerController.updateAnswer);
router.route('/:answerID').delete(answerController.deleteAnswer);
router.route('/:answerId').post(answerController.postReference);
router.route('/:answerID/delete').post(answerController.deleteAnswerReference);

module.exports = router;
