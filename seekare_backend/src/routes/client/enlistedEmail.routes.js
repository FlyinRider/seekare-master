const express = require('express');
const router = express.Router();

const enlistedEmailController = require('../../controllers/enlistedEmail.controller');

router
  .route('/')
  .get(enlistedEmailController.getEmail)
  .post(enlistedEmailController.addEmail);
router.route('/:email').delete(enlistedEmailController.deleteEmail);

module.exports = router;
