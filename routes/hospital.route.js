/*
    Ruta: /api/users'
*/

const { Router } = require('express');
const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospital.controller');

const router = Router();

router.get('/',getHospitals);

router.post('/', createHospitals);

router.put('/:id',  updateHospitals);

router.delete('/:id', deleteHospitals);

module.exports = router;