/*
    Ruta: /api/auth'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { validateInputs } = require('../middlewares/validate-inputs');
const { check } = require('express-validator');

const router = Router();

router.post('/login',
    check('password', 'El password es olbligatorio').not().isEmpty(),
    check('email', 'El email es olbligatorio').isEmail(),
    validateInputs, 
login);


module.exports = router;