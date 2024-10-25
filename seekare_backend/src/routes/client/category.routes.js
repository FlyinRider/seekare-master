const express = require('express');
const router = express.Router();

const categoryController = require('../../controllers/category.controller');

router.route('/').post(categoryController.createCategory);
router.route('/').get(categoryController.getCategories);
router.route('/').put(categoryController.updateCategory);
router.route('/').delete(categoryController.deleteCategory);

module.exports = router;
