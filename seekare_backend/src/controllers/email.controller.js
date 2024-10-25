
const https = require('https');
const mongoose = require('mongoose');

const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const User = require('../models/User');
const EnlistedEmail = require('../models/EnlistedEmail');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * send
 * Send Email
 *
 * @param {Request} req body: {fullname, email, subject, message}
 * @param {Response} res
 */

const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    // These environment variables will be pulled from the .env file
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
};
const transporter = nodemailer.createTransport(credentials);

exports.send = async (req, res) => {
  const { fullname, email, subject, message } = req.body;
  console.log('here')
  try {
    const msg = {
      to: process.env.EMAIL_RECEIVER,
      from: email,
      subject,
      html: `<div>
            <h1>Contact Support Received From ${fullname}</h1>
            <p>${message}</p>
            <p>Reply Email: <a href="mailto:${email}">${email}</a></p>
            </div>
        `,
    };

    const value = await transporter.sendMail(msg);

    res.status(200).json({
      message: 'Send ',
    });
  } catch (error) {
    res.status(403).json({ error });
  }
};

/**
 * verify
 * Email Verification
 *
 * @param {Request} req
 * @param {*} res
 */
exports.verify = async (req, res) => {
  const { email } = req.body;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
  };

  https.request({}, (res) => {
    res.status(200).json(res);
  });
};

/**
 * sendMdAnswer
 * Send MD answer to the User
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.sendMdAnswer = async (req, res) => {
  const {
    user: { userID, username },
    question: { questionID, title },
    mdUser: { mdID, mdname },
    mdAnswer: { answerID, content },
  } = req.body;

  try {
    const { email } = await User.findById(userID);

    const msg = {
      to: email,
      from: process.env.EMAIL_RECEIVER,
      subject: 'MD Answer',
      html: `<div style="padding: 2rem; text-align:center;">
            <h1>Your <a href='${
              process.env.NODE_ENV === 'development'
                ? process.env.DOMAIN_URL
                : process.env.DOMAIN_URL_PROD
            }'>Question</a> is reviewed by MD: ${mdname}</h1>
            <h2>Question: <a href='${
              process.env.NODE_ENV === 'development'
                ? process.env.DOMAIN_URL
                : process.env.DOMAIN_URL_PROD
            }'>${title}</a></h2>
            <div>${content}</div>
            </div>
        `,
    };

    await transporter.sendMail(msg);

    res.status(200).json({
      message: 'Send ',
    });
  } catch (error) {
    res.status(403).json({ error });
  }
};

/**
 * invite
 * Invite users by emails
 *
 * @param {Request} req {emails, subject, statement}
 * @param {Response} res
 * @route /email/invite
 */
exports.invite = async (req, res) => {
  const { emails, subject, content } = req.body;
  console.log(req.user)

  try {
    if (emails.length > 0) {
      await new EnlistedEmail({
        senderId: mongoose.Types.ObjectId(req.user.id),
        addresses: emails.map((email) => ({
          _id: mongoose.Types.ObjectId(),
          email,
        })),
      }).save();

      const msg = {
        to: emails,
        from: process.env.EMAIL_SENDER,
        subject,
        html: content,
      };

      await transporter.sendMail(msg);

      res.status(200).json({
        status: 'success',
        message: 'Email Sent',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: error,
    });
  }
};
