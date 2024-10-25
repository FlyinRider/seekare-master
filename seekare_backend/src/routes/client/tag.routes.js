const express = require('express');
const router = express.Router();

const tagsController = require('../../controllers/tag.controller');

router.route('/').get(tagsController.getTags).post(tagsController.postTag);
router.route('/:tagId').delete(tagsController.deleteTag);

module.exports = router;
