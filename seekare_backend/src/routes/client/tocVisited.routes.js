const express = require('express');
const router = express.Router();

const tocVisitedController = require('../../controllers/tocVisited.controller');

router.route('/').get(tocVisitedController.getVisitor).post(tocVisitedController.updateVisitor)
router.route('/new').post(tocVisitedController.postVisitor)

module.exports = router;