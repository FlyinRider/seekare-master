const nodemailer = require('nodemailer');
const { serviceEmail } = require('../email/email-service');

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
  
  exports.emailService = async (req, res) => {
    const { content, email } = req.body;
    try {
      let message = {
        from: process.env.EMAIL_RECEIVER,
        to: email,
        subject: 'SEEKARE message',
        text: 'For better  Seekare features',
        html: serviceEmail(content)
      };
      await transporter.sendMail(message);
      return res.status(200).json({
        code: `Email sent to ${email}`
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({
        error
      });
    }
  };