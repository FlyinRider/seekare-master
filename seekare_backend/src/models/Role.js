const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    default: 'user',
  },
  desc: {
    type: String,
    default:
      'User Can Access to the general questions and can add answer to those',
  },
});

module.exports = mongoose.model('Role', roleSchema);
