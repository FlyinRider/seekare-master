const express = require('express');
const router = express.Router();

const emailService = require('../../controllers/emailServices.controller.js');

router.post('/email-service', emailService.emailService);

module.exports = router;
