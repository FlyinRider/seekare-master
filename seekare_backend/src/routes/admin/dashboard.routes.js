const express = require('express');
const router = express.Router();

const dashboardController = require('../../controllers/admin/dashboard.controller');

router.route('/').get(dashboardController.getTotalDataReports);
router.route('/usersanalysis').post(dashboardController.getWeeklyUserReports);
router.route('/iniviteanalysis').post(dashboardController.getSendWeeklyEmails);

module.exports = router;
