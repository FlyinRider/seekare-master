const mongoose = require("mongoose");
const Tag = require("../models/Tag");

/**
 * Get Tags
 */
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      tags,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * Post New Tag
 *
 * @param {Request} req { title }
 * @param {Response} res
 */
exports.postTag = async (req, res) => {
  const { title, slug, description, category } = req.body;

  try {
    const existingTags = await Tag.find({ title });
    if (existingTags && existingTags.length > 0) {
      return res.status(201).json({
        status: "error",
        message: "Tag is already existing",
      });
    } else {
      await new Tag({ title, slug, description, category }).save();

      const tags = await Tag.find();

      res.status(200).json({
        tags,
      });
    }
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * Delete Tag
 */
exports.deleteTag = async (req, res) => {
  const { tagId } = req.params;

  try {
    await Tag.deleteOne({
      _id: mongoose.Types.ObjectId(tagId),
    });

    const tags = await Tag.find();

    res.status(200).json({
      tags,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};
