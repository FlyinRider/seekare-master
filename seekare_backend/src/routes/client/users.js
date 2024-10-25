const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users');
const adminProtected = require('../../middleware/adminProtected');
const tokenMiddleware = require('../../middleware/tokenMiddleware');

router
  .post('/getUsers', tokenMiddleware, userController.getUsers)
  .put('/', tokenMiddleware, userController.updateUser)
  .post('/', adminProtected, userController.createUser)
  .post('/email-confirm', userController.emailConfirmation)
  .post('/signup', userController.postSignUp)
  .post('/signin', userController.siginNameOrMail)
  .post('/signup/google', userController.signUpWithGoogle)
  .post('/signin/google', userController.signInWithGoogle)
  .get('/auth/token', userController.signInWithToken)
  .post('/membership', tokenMiddleware, userController.registerMembership)
  .delete('/membership', tokenMiddleware, userController.deleteMembership)
  .get('/roles', userController.getUserRoles)
  .get('/mds', userController.getMDs)
  .get('/password-change', userController.pwdChangeRequest)
  .post('/password-change', userController.passwordChange)
  .get('/:userID', tokenMiddleware, userController.getUser)
  .delete('/:userID', tokenMiddleware, userController.deleteUser)
  .get('/:userID/questions', userController.getQuestionsPosted)
  .post('/:userID/email', userController.updateEmail)
  .post('/:userID/pwchange', userController.pwdChange)
  .post('/:userID/info', userController.updateInfo)
  .get('/:userID/deactivate', adminProtected, userController.deactivateUser)
  .post('/verifyCaptcha', userController.verifyCaptcha)
  .post('/upload', userController.uploadFile);

module.exports = router;
