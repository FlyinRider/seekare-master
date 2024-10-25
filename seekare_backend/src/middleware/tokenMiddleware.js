const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../misc/keys');

module.exports = (req, res, next) => {
  const authHeader = req.headers['x-mdhelp-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token !== null) {
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        next();
      } else {
        if (user && user.id) {
          req.user = user;
        }
      }
    });
  }

  next();
};
