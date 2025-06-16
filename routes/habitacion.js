const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const habitacionController = require('../controllers/habitacionController');

router.get('/', requireAuth, habitacionController.vistaHabitaciones);

router.post('/habitaciones/crear', requireAuth, habitacionController.crearHabitacionEP);

module.exports = router;
