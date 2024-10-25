const config = require('./' + process.env.NODE_ENV + '.config.js') || {};
module.exports = config;
