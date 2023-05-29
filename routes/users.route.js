/*
    Ruta: /api/users'
*/

const { Router } = require('express');
const {check} = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs')
const { getUsers, createUser, updateUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'El nombre es olbligatorio').not().isEmpty(),
    check('password', 'El password es olbligatorio').not().isEmpty(),
    check('email', 'El email es olbligatorio').isEmail(),
    validateInputs
], createUser);

router.put('/:id', [
    check('name', 'El nombre es olbligatorio').not().isEmpty(),
    check('email', 'El email es olbligatorio').isEmail(),
    check('roles', 'El role es olbligatorio').not().isEmpty(),
    validateInputs
], updateUser);

module.exports = router;