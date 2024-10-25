
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Role = require("../models/Role");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * createCheckoutSession
 * Create Checkout Session
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.createCheckoutSession = async (req, res) => {
  const domainURL =
    process.env.NODE_ENV === "development"
      ? process.env.DOMAIN_URL
      : process.env.DOMAIN_URL_PROD;
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/subscription/failed`,
    });

    res.status(200).json({
      sessionId: session.id,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

/**
 * setup
 * Setup Stripe Keys
 *
 * @route /payment/setup
 * @param {Request} req
 * @param {Response} res {publishableKey : stripe pub key, priceId: price id to subscribe}
 */
exports.setup = async (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    priceId: process.env.PRICE_ID,
  });
};

/**
 * checkout
 * Checkout Session
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.checkout = async (req, res) => {
  const { userID, sessionId } = req.body;
  try {
    const {
      id,
      payment_status,
      subscription,
    } = await stripe.checkout.sessions.retrieve(sessionId);

    const role = await Role.findOne({
      title: "premium_user",
    });

    await User.updateOne(
      {
        _id: mongoose.Types.ObjectId(userID),
      },
      {
        role: role._id,
        payment: {
          paid: payment_status === "paid",
          session: id,
          subscription,
        },
      }
    );

    res.status(200).json({
      sessionId: id,
      payment_status,
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};

exports.cancelSubscription = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await User.findById(userID);
    stripe.subscriptions.del(user.payment.subscription);

    const role = await Role.findOne({
      title: "user",
    });

    await User.updateOne(
      {
        _id: mongoose.Types.ObjectId(userID),
      },
      {
        role: role._id,
        payment: {
          paid: false,
          session: null,
          subscription: null,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Successfully Cancelled subscription",
    });
  } catch (error) {
    res.status(403).json({
      error,
    });
  }
};
