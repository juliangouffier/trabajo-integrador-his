const { Cama, Habitacion } = require('../models');
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');

router.post('/', async (req,res,next) => {
  try {
    const { numero, habitacion_id } = req.body;
    const hab = await Habitacion.findByPk(habitacion_id);
    if (!hab) return res.status(400).json({ error: 'Habitación inválida' });
    const cama = await Cama.create({ numero, habitacion_id });
    return res.status(201).json(cama);
  } catch(e){ next(e); }
});

module.exports = router;