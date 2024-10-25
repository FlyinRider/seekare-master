import API from './api';
class PaymentService {
  constructor() {
    this._token = '';
  }

  /**
   * Register Membership
   *
   * @param {Object} payment Payment Object
   */
  async registerMembership(payment) {
    const res = await API.post('/v1/users/membership', { payment });

    return res.data;
  }

  /**
   * Setup Payment Config
   */
  async setup() {
    const res = await API.get('/v1/payment/setup');

    return res.data;
  }


  /**
   * Create Payment Session
   */
  async createSession(priceId) {
    const res = await API.post('/v1/payment/create-checkout-session', {
      priceId,
    });

    return res.data;
  }

  /**
   * Checkout Subscription Session
   */
  async checkoutSession(userID, sessionId) {
    const res = await API.post('/v1/payment/checkout-session', {
      userID,
      sessionId,
    });

    return res.data;
  }

  /**
   * Cancel Subscription
   */
  async cancelSubscription(userID) {
    const res = await API.post('/v1/payment/cancel', {
      userID,
    });

    return res.data;
  }
}

const instance = new PaymentService();

export default instance;
