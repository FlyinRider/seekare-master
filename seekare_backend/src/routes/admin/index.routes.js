const express = require('express');
const router = express.Router();
const dashboardRoute = require('./dashboard.routes');
const searchKeywordRoute = require('./searchkeywords.routes');
router.use('/dashboard', dashboardRoute);
router.use('/keyword', searchKeywordRoute);

module.exports = router;
