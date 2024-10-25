const express = require('express');
const router = express.Router();

const questionController = require('../../controllers/question.controller');

router
  .route('/')
  // .post(fileMiddleware("files", 10), questionController.postQuestion)
  .post(questionController.postQuestion)
  .get(questionController.getQuestions);

router.route('/tags').get(questionController.getAllQuestionTags);
router.route('/tags').post(questionController.createWikiQuiz);
router.route('/tags/:tagId').post(questionController.updateQuestionTag);
router.route('/tags/:tagId').delete(questionController.deleteQuestionTag);
router.route('/tags-delete').post(questionController.deleteQuestionTags);

router.route('/untagged').get(questionController.getUntaggedQuestions);
router.route('/md/:mdID').get(questionController.getMDQuestions);
router.route('/answered/:userID').get(questionController.getQuestionsAnswerd);
router.route('/sorted').get(questionController.getQuestionsSorted);
router.route('/similar-queries').get(questionController.getSimilarQueries);

router
  .route('/:questionID')
  .get(questionController.getSingleQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion)
  .post(questionController.postReference);

router.route('/:questionID/delete').post(questionController.deleteReference);
router.route('/:questionID/assignMd').post(questionController.assignMD);
router.route('/:questionID/removeMd').delete(questionController.removeMD);
router.route('/:questionID/vote').post(questionController.vote);
router.route('/:questionID/tags').post(questionController.addTags);
router.route('/:questionID/banned').get(questionController.setBanned);
router.route('/:questionID/status').get(questionController.setStatus);
router.route('/similar').post(questionController.findSimilar);

module.exports = router;
