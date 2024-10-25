const mongoose = require("mongoose");
const tocSchema = require("../models/Toc");

/**
 * Get Tags
 */
exports.getToc = async (req, res) => {
  try {
    const tocs = await tocSchema.find();
    res.status(200).json({
      tocs,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

exports.postToc = async(req, res) => {
  try {
    const { tocId } = req.body 
    const tocs = await tocSchema.find({_id: tocId});
    const date = Date.now()
    await tocSchema.updateOne(
      {_id: tocId},
      {$set:{updated: date}});
    res.status(200).json({
      tocs,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
}