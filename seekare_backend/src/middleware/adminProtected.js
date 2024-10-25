const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../misc/keys");
const Role = require("../models/Role");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["x-mdhelp-token"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token !== null) {
    try {
      const userData = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(mongoose.Types.ObjectId(userData.id));
      const userRole = await Role.findById(user.role);

      if (userRole.title === "admin") {
        return next();
      } else {
        return res.status(403).json({
          error: "You are not allowed for this action",
        });
      }
    } catch (error) {
      return res.status(403).json({
        error: "Error in Authentication",
      });
    }
  }

  return res.status(403).json({
    error: "Error in Authentication",
  });
};
