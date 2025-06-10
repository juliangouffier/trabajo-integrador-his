const express = require('express');
const router = express.Router();
const { Sector, Habitacion } = require('../models');
const requireAuth = require('../middleware/authMiddleware');
const sectorController = require('../controllers/sectorController');

router.use(requireAuth);

router.get('/sectores', sectorController.obtenerSectores);

module.exports = router;
