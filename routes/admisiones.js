const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const { renderFormularioAdmision, crearAdmisionEP} = require('../controllers/admisionController');

router.get('/admisiones', requireAuth, renderFormularioAdmision);
router.post('/admisiones/registro', crearAdmisionEP);

module.exports = router;
