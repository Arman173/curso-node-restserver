const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, emailExists, userExistsById } = require('../helpers/db-validators');

const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'name is require').not().isEmpty(),
    check('password', 'required password be more than 6 digits').isLength({ min: 6 }),
    check('email', 'invalid email').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
], userPost);

router.put('/:id', [
    check('id', 'invalid ID').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isRoleValid ),
    validateFields
], userPut);

router.patch('/', userPatch);

router.delete('/:id', [
    check('id', 'invalid ID').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], userDelete);


module.exports = router;
