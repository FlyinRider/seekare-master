const express = require('express');
const router = express.Router();

const dbController = require('../../controllers/db.controller');

router.route('/download').get(dbController.download);
router.route('/backups').get(dbController.getBackupFiles);

module.exports = router;
