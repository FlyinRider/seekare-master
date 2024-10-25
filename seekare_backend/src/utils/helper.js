const jwt = require('jsonwebtoken');
const keys = require('./../misc/keys');

exports.genPwdChangeToken = (email) => {
  jwt.sign(email, keys.JWT_EMAIL_KEY, () => {});
};
