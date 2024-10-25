const express = require('express');
const router = express.Router();

const emailController = require('../../controllers/email.controller');
const tokenMiddleware = require('../../middleware/tokenMiddleware');

router.route('/send').post(emailController.send);
router.route('/verify').post(emailController.verify);
router.route('/sendMdAnswer').post(emailController.sendMdAnswer);
router.route('/invite').post(tokenMiddleware, emailController.invite);
router.route('/verify').post(emailController.verify);

module.exports = router;
