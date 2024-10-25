const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Category = require('../models/Category');

/**
 * Get Categories
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: 'success',
      categories
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: 'Failed to fetch Categories'
    });
  }
};

/**
 * Create New Category
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {object} Response Object
 */
exports.createCategory = async (req, res) => {
  const { title, tag, description } = req.body;

  try {
    const existing = await Category.find({ tag });
    if (existingTags && existingTags.length > 0) {
      return res.status(201).json({
        status: 'error',
        message: 'Tag is already existing'
      });
    } else {
      await new Category({ title, tag, description }).save();

      const categories = await Category.find();

      res.status(200).json({
        status: 'succcess',
        message: 'Created new Category',
        categories
      });
    }
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: 'Failed to create new category'
    });
  }
};

/**
 * Delete Categories
 */
exports.deleteCategory = async (req, res) => {
  const { categoryIds } = req.body;

  try {
    await Category.deleteMany({
      _id: {
        $in: categoryIds
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted'
    });
  } catch (error) {
    res.status(201).json({
      status: 'error',
      message: 'Failed to Delete categories'
    });
  }
};

/**
 * Update Category
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.updateCategory = async (req, res) => {
  const { categoryId, title, tag, description } = req.body;

  try {
    await Category.updateOne(
      {
        _id: ObjectId(categoryId)
      },
      {
        title,
        tag,
        description
      }
    );

    const categories = await Category.find();

    res.status(200).json({
      status: 'success',
      message: 'Successfully Updated',
      categories
    });
  } catch (error) {
    res.status(201).json({
      status: 'error',
      message: 'Failed to update Category'
    });
  }
};
