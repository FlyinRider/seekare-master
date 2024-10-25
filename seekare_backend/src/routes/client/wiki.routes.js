const express = require('express');
const router = express.Router();

const wikisController = require('../../controllers/wiki.controller');
// question tags

router.route('/').get(wikisController.getWikiData);
router.route('/tag/:tagId').get(wikisController.getWikiByTagId);
router
  .route('/category/:wikiId')
  .post(wikisController.updateQuestionCategories);
router.route('/:wikiId').get(wikisController.getWikiById);
router.route('/create').post(wikisController.createWiki);
router.route('/update').post(wikisController.updateWiki);
router.route('/:wikiId').delete(wikisController.deleteWiki);

router.route('/question/:wikiId').post(wikisController.updateQuestionToWiki);
router
  .route('/question/:wikiId/:quizId')
  .delete(wikisController.deleteQuestionToWiki);

module.exports = router;
