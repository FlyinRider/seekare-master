const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enlistedEmailSchema = new Schema({
  address: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('EnlistedEmail', enlistedEmailSchema);
