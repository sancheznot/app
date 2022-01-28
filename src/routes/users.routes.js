const { Router }  = require('express');
const router = Router();
const { renderSignUpForm, renderSignInform, signup, signin, logout } = require('../controllers/user.control');

router.get('/users/singup', renderSignUpForm);

router.post('/users/singup', signup);

router.get('/users/singin', renderSignInform);

router.post('/users/singin', signin);

router.get('/users/logout', logout);

module.exports = router;