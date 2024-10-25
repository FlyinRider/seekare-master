const mongoose = require('mongoose');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const sgMail = require('@sendgrid/mail');
let fs = require('fs');
var randomstring = require('randomstring');
const User = require('../models/User');
const { JWT_SECRET, JWT_EMAIL_KEY } = require('../misc/keys');
const Role = require('../models/Role');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const nodemailer = require('nodemailer');
const { confirmEmail } = require('../email/email-confirm');

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const OAuthClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
/**
 * Sign UP
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

function generateRandomCode() {
  return Math.floor(Math.random() * 900000) + 100000;
}

exports.emailConfirmation = async (req, res) => {
  const { username, email } = req.body;
  try {
    const existingUser = await User.find({
      $or: [{ username }, { email }]
    });

    // Check Deactivated User
    // if (existingUser.deactivated) {
    //   return res.status(201).json({
    //     status: 'error',
    //     message: 'You can not create User with this email'
    //   });
    // }
    if (existingUser && existingUser.length > 0) {
      console.log(existingUser)
      return res.status(201).json({
        status: 'error',
        message: 'User Name or Email is already taken'
      });
    }

    const code = generateRandomCode();
    let message = {
      from: process.env.EMAIL_RECEIVER,
      to: email,
      subject: 'SEEKARE message',
      text: 'For better  Seekare features',
      html: confirmEmail(code)
    };
    await transporter.sendMail(message);
    return res.status(200).json({
      code: code
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error
    });
  }
};

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.find({
      $or: [{ username }, { email }]
    });

    // Check Deactivated User
    if (existingUser.deactivated) {
      return res.status(201).json({
        status: 'error',
        message: 'You can not create User with this email'
      });
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(201).json({
        status: 'error',
        message: 'User Name or Email is already taken'
      });
    }

    // if (process.env.NODE_ENV !== 'development') {
    //   const { status } = await axios
    //     .get(
    //       `${process.env.EMAIL_VALIDATION_API}?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}`
    //     )
    //     .then((res) => res.data);

    //   if (status !== 'valid') {
    //     return res.status(201).json({
    //       status: 'error',
    //       message: 'Please input working email'
    //     });
    //   }
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userRole = await Role.findOne({ title: 'user' });

    const user = await new User({
      username,
      email,
      password: hashedPassword,
      role: userRole._id
    }).save();

    jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: 3600 * 24 },
      async (err, token) => {
        return res.status(200).json({
          message: 'Successfully Signed Up',
          isAuth: true,
          token: 'Bearer ' + token,
          errors: {
            email: '',
            username: ''
          },
          username,
          email,
          role: userRole,
          userID: user._id,
          searchHistory: user.searchHistory
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error
    });
  }
};

/**
 * signUpWithGoogle
 * Sign Up with Google
 *
 * @param {Request} req
 * @param {Request} res
 */
exports.signUpWithGoogle = async (req, res) => {
  const { tokenId } = req.body;

  const ticket = await OAuthClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID
  });

  const { name: username, email } = ticket.getPayload();

  const password = '12345678';

  try {
    const existingUser = await User.find({
      $or: [{ username }, { email }]
    });

    if (existingUser && existingUser.length > 0) {
      return res.status(201).json({
        status: 'error',
        message: 'User Name or Email is already taken'
      });
    }

    // const { status } = await axios
    //   .get(
    //     `${process.env.EMAIL_VALIDATION_API}?api_key=${process.env.ZERO_BOUNCE_API_KEY}&email=${email}`
    //   )
    //   .then((res) => res.data);

    // if (status !== 'valid') {
    //   return res.status(201).json({
    //     status: 'error',
    //     message: 'Please input working email'
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userRole = await Role.findOne({ title: 'user' });

    const user = await new User({
      username,
      email,
      password: hashedPassword,
      role: userRole._id
    })
      .save()
      .then((result) => result);

    jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: 3600 * 24 },
      async (err, token) => {
        return res.status(200).json({
          message: 'Successfully Signed Up',
          isAuth: true,
          token: 'Bearer ' + token,
          errors: {
            email: '',
            username: ''
          },
          username,
          email,
          role: userRole,
          userID: user._id,
          searchHistory: user.searchHistory
        });
      }
    );
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * signInWithGoogle
 * Sign In with Google
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.signInWithGoogle = async (req, res) => {
  const { tokenId } = req.body;

  const ticket = await OAuthClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID
  });

  const { email } = ticket.getPayload();

  const password = '12345678';

  try {
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(201).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({
        error: 'password',
        message: 'Password is incorrect'
      });
    }

    const role = await Role.findById(user.role);

    jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) {
          return res.status(403).json({
            status: 'error',
            message: 'Can not authorize'
          });
        }

        return res.status(201).json({
          message: 'authorized',
          token: 'Bearer ' + token,
          email: user.email,
          userID: user._id,
          username: user.username,
          searchHistory: user.searchHistory,
          role,
          payment: {
            status: user.payment.paid,
            sesssion: user.payment.session
          }
        });
      }
    );
  } catch (error) {
    res.status(403).json({
      error: 'Can not find user'
    });
  }
};

/**
 * Create Uer by Admin
 */
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 12, 12);

    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) {
      if (existing.deactivated) {
        return res.status(200).json({
          status: 'error',
          message: 'Already Email or User Name is existing'
        });
      } else {
        return res.status(200).json({
          status: 'error',
          message: 'Can not create the User with this username or email'
        });
      }
    }

    const userRole = await Role.findOne({ title: 'user' });

    const newUser = await new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole._id
    })
      .save()
      .then((result) => result);

    res.status(200).json({
      status: 'success',
      message: 'Created New User',
      data: {
        newUser
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error
    });
  }
};

/**
 * Sign In
 */
exports.postSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email.toLowerCase()
    });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({
        error: 'password',
        message: 'Password is incorrect'
      });
    }

    const role = await Role.findById(user.role);

    jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) {
          return res.status(403).json({
            status: 'error',
            message: 'Can not authorize'
          });
        }

        return res.status(201).json({
          message: 'authorized',
          token: 'Bearer ' + token,
          email: user.email,
          userID: user._id,
          username: user.username,
          searchHistory: user.searchHistory,
          role,
          payment: {
            status: user.payment.paid,
            sesssion: user.payment.session
          }
        });
      }
    );
  } catch (error) {
    res.status(403).json({
      error: 'Can not find user'
    });
  }
};

exports.siginNameOrMail = async (req, res) => {
  const { emailOrName, password } = req.body;

  try {
    // Check if it email
    const email_regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let searchQuery;
    if (email_regex.test(emailOrName.toLowerCase())) {
      searchQuery = { email: emailOrName.toLowerCase() };
    } else {
      searchQuery = { username: new RegExp(`\\b${emailOrName}\\b`, 'i') };
    }
    const user = await User.findOne(searchQuery);
    // Check if Deactivated User
    if (user.deactivated) {
      return res.status(403).json({
        status: 'error',
        message: 'User is not existed'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({
        error: 'password',
        message: 'Password is incorrect'
      });
    }

    const role = await Role.findById(user.role);

    jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: 3600 * 24 },
      (err, token) => {
        if (err) {
          return res.status(403).json({
            status: 'error',
            message: 'Can not authorize'
          });
        }

        return res.status(201).json({
          message: 'authorized',
          token: 'Bearer ' + token,
          email: user.email,
          userID: user._id,
          username: user.username,
          searchHistory: user.searchHistory,
          role,
          payment: {
            status: user.payment.paid,
            sesssion: user.payment.session
          }
        });
      }
    );
  } catch (error) {
    res.status(403).json({
      error: 'Can not find user'
    });
  }
};

/**
 * Sign In With Token
 */
exports.signInWithToken = async (req, res) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['x-mdhelp-token'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null)
    return res.status(200).json({
      success: false,
      message: 'No Token Provided'
    });

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err)
      return res.status(200).json({
        success: false,
        message: 'Token is invalid'
      });

    if (user && user.id) {
      const currentUser = await User.findById(user.id);
      try {
        const role = await Role.findById(currentUser.role);

        return res.status(200).json({
          success: true,
          userID: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          role,
          searchHistory: currentUser.searchHistory
        });
      } catch (error) {
        return res.status(403).json({
          error
        });
      }
    }
  });
};

/**
 * Register Membership for specific User
 */
exports.registerMembership = async (req, res) => {
  const { payment } = req.body;
  const { user } = req;

  if (!user) {
    return res.status(403).json({
      message: 'Please Sign In/Sign Up to register memebership'
    });
  }

  try {
    await User.updateOne(
      {
        _id: mongoose.Types.ObjectId(user.id)
      },
      {
        payment
      }
    );

    const updatedUser = await User.findById(mongoose.Types.ObjectId(user.id));

    const premium_role = await Role.findOne({ title: 'premium_user' });

    res.status(200).json({
      payment: updatedUser.payment,
      role: premium_role
    });
  } catch (error) {
    res.status(403).json({
      message: 'Failed to upgrade membership'
    });
  }
};

/**
 * Downgrade The Membership
 */
exports.deleteMembership = (req, res) => {
  res.status(200).json({
    message: 'Deleted Membership'
  });
};

/**
 * Get all users by Admin
 */
exports.getUsers = async (req, res) => {
  const { sortBy, sortDir, limit, offset, searchWord } = req.body;
  const { user } = req;

  if (!user) {
    return res.status(403).json({
      message: 'Please Sign In/Sign Up'
    });
  }

  try {
    const orderBy = { [sortBy]: sortDir === 'false' ? -1 : 0 };
    const $regex = new RegExp(searchWord, 'i');
    const queryParams = {};
    if (searchWord) {
      queryParams.$or = [
        { username: $regex },
        { email: $regex },
        {
          'usres.username': $regex
        },
        {
          'users.email': $regex
        }
      ];
    }

    const allUsers = await User.find(queryParams);

    const users = await User.find(queryParams)
      .sort(orderBy)
      .skip(offset)
      .limit(limit);
    // const usersCount = await User.countDocuments();

    const res_users = [];
    for (const _user of users) {
      const answers = await _user.getAnswers();
      const questions = await _user.getQuestions();

      res_users.push({
        _id: _user.id,
        username: _user.username,
        email: _user.email,
        role: _user.role,
        payment: _user.payment,
        answersNumber: answers.length,
        questionsNumber: questions.length,
        createDate: _user.createDate,
        deactivated: _user.deactivated
      });
    }

    res.status(200).json({
      users: res_users,
      count: allUsers.length
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Get User Detail
 * @param {Object} req {userID}
 */
exports.getUser = async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);

    const role = await Role.findById(mongoose.Types.ObjectId(user.role));

    const user_res = {
      id: user._id,
      username: user.username,
      photoUrl: user.photoUrl,
      email: user.email,
      role,
      intro: user.intro,
      payment: {
        paid: user.payment.paid,
        session: user.payment.session
      },
      gender: user.gender,
      age: user.age,
      conditions: user.conditions,
      deactivated: user.deactivated
    };

    res.status(200).json({
      user: user_res
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Update User
 *
 */
exports.updateUser = async (req, res) => {
  const { userInfo } = req.body;
  const { user } = req;

  // Check if authenticated
  if (!user) {
    return res.status(403).json({
      message: 'Please Sign In/Sign Up'
    });
  }

  const { userID, password, username, email, intro, photoUrl } = userInfo;

  try {
    await User.updateOne(
      {
        _id: userID
      },
      {
        $set: { ...userInfo },
        $currentDate: { lastModified: true }
      }
    );

    res.status(200).json({
      message: 'Successfully Updated User'
    });
  } catch (error) {
    res.status(403).json({
      message: error
    });
  }
};

/**
 * Get User Roles
 */
exports.getUserRoles = async (req, res) => {
  try {
    const roles = await Role.find({});

    res.status(200).json({
      roles
    });
  } catch (error) {
    res.status(403).json({
      roles: []
    });
  }
};

/**
 * Delete User
 */
exports.deleteUser = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(403).json({
      message: 'You are not logged in'
    });
  }

  try {
    const { userID } = req.params;

    await User.deleteOne({
      _id: userID
    });

    await Question.deleteMany({
      userID
    });

    await Answer.deleteMany({
      userID
    });

    res.status(200).json({
      message: 'Successfully Deleted'
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Get MDs
 */
exports.getMDs = async (req, res) => {
  try {
    const mdRole = await Role.find({
      title: 'md'
    });

    const mds = await User.find({
      role: mongoose.Types.ObjectId(mdRole[0]._id)
    });

    res.status(200).json({
      mds
    });
  } catch (error) {
    res.status(403).json({
      message: "Can't find MDs"
    });
  }
};

/**
 * Get Questions User Posted
 */
exports.getQuestionsPosted = async (req, res) => {
  const { userID } = req.params;
  try {
    const questions = await Question.find({
      userID
    });

    res.status(200).json({
      questions
    });
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Password Change
 */
exports.pwdChange = async (req, res) => {
  const { userID } = req.params;

  const { currentPwd, newPwd } = req.body;

  try {
    const user = await User.findById(userID);
    const isValidPassword = await bcrypt.compare(currentPwd, user.password);

    if (isValidPassword) {
      const newHashedPwd = bcrypt.hashSync(newPwd, 12);

      await User.updateOne(
        {
          _id: mongoose.Types.ObjectId(userID)
        },
        {
          password: newHashedPwd
        }
      );
      res.status(200).json({
        status: 'success',
        message: 'Updated Password'
      });
    } else {
      res.status(200).json({
        status: 'error',
        message: 'Current Password is not correct'
      });
    }
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Update Email
 */
exports.updateEmail = async (req, res) => {
  const { userID } = req.params;
  const { email } = req.body;

  try {
    const emailExisting = await User.findOne({
      email
    });

    if (!emailExisting) {
      await User.updateOne(
        {
          _id: mongoose.Types.ObjectId(userID)
        },
        {
          email
        }
      );

      res.status(200).json({
        status: 'success',
        message: 'Email Updated'
      });
    } else {
      res.status(200).json({
        status: 'error',
        message: 'Email Already Existing'
      });
    }
  } catch {
    res.status(403).json({
      error
    });
  }
};

/**
 * Update Info
 */
exports.updateInfo = async (req, res) => {
  const { userID } = req.params;
  const { username, intro } = req.body;

  try {
    const existingUser = await User.find({
      $or: [{ username }]
    });

    if (existingUser && existingUser.length > 0) {
      return res.status(201).json({
        status: 'error',
        message: 'Username is already taken'
      });
    }

    await User.updateOne(
      {
        _id: mongoose.Types.ObjectId(userID)
      },
      {
        username,
        intro: intro ? intro : ''
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Updated Info',
      info: {
        username,
        intro
      }
    });
  } catch (error) {
    res.status(403).json({
      message: 'Unknow Error'
    });
  }
};

/**
 * Password Change Request
 *
 * @param {Request} req
 * @param {Reponse} res
 */
exports.pwdChangeRequest = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(201).json({
        status: 'error',
        message: 'Email is not existing!'
      });
    }

    jwt.sign(
      { email },
      JWT_EMAIL_KEY,
      { expiresIn: 5 * 60 },
      async (error, token) => {
        if (error) {
          return res.status(403).json({
            error
          });
        }

        // Save pwd change token
        await User.updateOne(
          {
            email
          },
          {
            pwdChangeToken: token
          }
        );
        const domain =
          process.env.NODE_ENV === 'development'
            ? process.env.DOMAIN_URL
            : process.env.DOMAIN_URL_PROD;

        const msg = {
          to: email,
          from: process.env.EMAIL_RECEIVER,
          subject: 'Your password reset link',
          html: `<div>
                        <h1>We've received your request to reset your password.</h1>
                        <p>Click here to set up a new password for your account. This link will expire in 5 minutes.</p>
                        <p><a href="${domain}/pwdchange?token=${token}">Click Here</a></p>
                      </div>
                  `
        };

        await transporter.sendMail(msg);

        return res.status(200).json({
          status: 'success',
          message: 'Please check your email!'
        });
      }
    );
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

/**
 * Deactivate the user
 */
exports.deactivateUser = async (req, res) => {
  const { userID } = req.params;
  const { status } = req.query;

  try {
    await User.updateOne(
      {
        _id: userID
      },
      {
        deactivated: status || false
      }
    );

    if (status) {
      return res.status(200).json({
        status: 'success',
        message: 'Deactivated the User'
      });
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'Activated the User'
      });
    }
  } catch (error) {
    return res.status(201).json({
      status: 'error',
      message: 'Failure'
    });
  }
};

/**
 * passwordChange
 * Change Password with token and new password
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.passwordChange = async (req, res) => {
  const { token, password } = req.body;

  jwt.verify(token, JWT_EMAIL_KEY, async (error, data) => {
    if (error) {
      return res.status(201).json({
        status: 'error',
        message: 'Your request is expired'
      });
    }

    const { email } = data;

    try {
      const newPwd = bcrypt.hashSync(password, 12);
      await User.updateOne(
        {
          email
        },
        {
          password: newPwd
        }
      );

      res.status(200).json({
        status: 'success',
        message: 'Password Changed'
      });
    } catch (error) {
      res.status(403).json({
        error
      });
    }
  });
};

/**
 * Verify Recaptcha Action
 *
 * @param {Request} req
 * @param {Response} res
 */
exports.verifyCaptcha = async (req, res) => {
  const { token } = req.body;

  try {
    const { success, score } = await axios
      .post(
        process.env.GOOGLE_RECAPTCHA_VERIFY_API,
        `secret=${process.env.GOOGLE_RECAPTCHA_SERVER_KEY}&response=${token}`
      )
      .then((res) => res.data);

    if (success) {
      res.status(200).json({
        status: 'success',
        message: 'Action is successful'
      });
    } else {
      res.status(200).json({
        status: 'error',
        message: 'Action is Failed'
      });
    }
  } catch (error) {
    res.status(403).json({
      error
    });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    let resFile = req.body.base64File;
    let base64File = resFile.split(';base64,').pop();

    const random = randomstring.generate({
      length: 40,
      charset: 'alphabetic'
    });

    await fs.writeFile(
      __dirname + '/../uploads/' + random + '.png',
      base64File,
      { encoding: 'base64' },
      function (err) {
        console.log('File created:', random + '.png');
      }
    );
    const result = random + '.png';

    return res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (err) {
    res.status(403).json({
      error
    });
  }
};
