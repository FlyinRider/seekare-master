const express = require('express');
const router = express.Router();

const searchKeywordRoute = require('../../controllers/admin/searchkeywords.controller');

router.route('/').get(searchKeywordRoute.getUsersAnalysisbyKeywords);
router.route('/').post(searchKeywordRoute.getPopularQueryKeywords);

module.exports = router;
