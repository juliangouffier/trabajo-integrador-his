const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/pacientes/predict', pacienteController.predictDni);
router.get('/pacientes/buscar', pacienteController.buscar);


module.exports = router;
