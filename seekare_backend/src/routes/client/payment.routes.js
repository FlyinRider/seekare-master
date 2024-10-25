const express = require('express');
const router = express.Router();

const paymentController = require('../../controllers/payment.controller');

router
  .route('/create-checkout-session')
  .post(paymentController.createCheckoutSession);

router.route('/setup').get(paymentController.setup);
router.route('/checkout-session').post(paymentController.checkout);
router.route('/cancel').post(paymentController.cancelSubscription);

module.exports = router;
