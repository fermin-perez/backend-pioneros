const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const { existUserById } = require('../helpers/db-validators');

const { getUsers, getUser } = require('../controllers/users');

const router = Router();

router.get('/', [validateJWT, isAdminRole], getUsers);

router.get(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  getUser
);

module.exports = router;
