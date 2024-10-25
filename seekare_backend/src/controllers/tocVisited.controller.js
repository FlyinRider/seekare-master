const mongoose = require("mongoose");
const tocVisitedSchema = require("../models/TocVisited");

/**
 * Get Tags
 */
exports.getVisitor = async (req, res) => {
  try {
    const visitors = await tocVisitedSchema.find();
    res.status(200).json({
      visitors,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

exports.updateVisitor = async (req, res) => {
    const { userId } = req.body;
    try {
      const tags = await tocVisitedSchema.find({userId});
      const date = Date.now()
      await tocVisitedSchema.updateOne(
        {userId},
        {$set:{visited: date}});
      res.status(200).json({
        tags,
      });
    } catch (error) {
      res.status(403).json({
        error,
      });
    }
};

exports.postVisitor = async (req, res) => {
    const { userId } = req.body;
    try {
      const date = Date.now();
      await new tocVisitedSchema(
        {userId, visited: date}).save();
      res.status(200).json({
        tags,
      });
    } catch (error) {
      res.status(403).json({
        error,
      });
    }
};