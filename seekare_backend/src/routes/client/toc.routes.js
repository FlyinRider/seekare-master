const express = require('express');
const router = express.Router();

const tocController = require('../../controllers/toc.controller');

router.route('/').get(tocController.getToc).post(tocController.postToc)

module.exports = router;