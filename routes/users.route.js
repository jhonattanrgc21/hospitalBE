/*
    Ruta: /api/users'
*/

const { Router } = require('express');
const {check} = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

router.get('/', validateToken ,getUsers);

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

router.delete('/:id', deleteUser);

module.exports = router;