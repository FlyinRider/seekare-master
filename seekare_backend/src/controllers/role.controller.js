const mongoose = require("mongoose");
const Role = require("../models/Role");

/**
 * Get Roles
 */
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});

    res.status(200).json({
      roles,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * Update Role
 */
exports.updateRole = async (req, res) => {
  const { title, desc } = req.body;
  const { roleID } = req.params;

  try {
    await Role.updateOne(
      {
        _id: mongoose.Types.ObjectId(roleID),
      },
      {
        title,
        desc,
      }
    );

    const roles = await Role.find();

    res.status(200).json({
      roles,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * Delete Role
 */
exports.deleteRole = async (req, res) => {
  const { roleID } = req.params;

  try {
    await Role.deleteOne({
      _id: roleID,
    });

    const roles = await Role.find();

    res.status(200).json({
      message: "Deleted Successfully",
      roles,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * Create New Role
 */
exports.createRole = async (req, res) => {
  const { title, desc } = req.body;

  try {
    const existing = await Role.find({
      title,
    });

    if (existing && existing.length > 0) {
      return res.status(403).json({
        error: "Already existing role",
      });
    }

    const newRole = await new Role({ title, desc })
      .save()
      .then((result) => result);
    const roles = await Role.find();

    res.status(200).json({
      role: newRole,
      roles,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};
