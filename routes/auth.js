const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { existEmail } = require('../helpers/db-validators');

const { login, register, renew } = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('email').custom(existEmail),
    validateFields,
  ],
  register
);

router.get('/renew', [validateJWT, validateFields], renew);

module.exports = router;
