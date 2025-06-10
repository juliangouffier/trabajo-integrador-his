const express = require('express');
const router = express.Router();
const { Habitacion, Sector } = require('../models');
const requireAuth = require('../middleware/authMiddleware');
const habitacionController = require('../controllers/habitacionController');

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const listaHab = await Habitacion.findAll({
      include: [{
        model: Sector,
        as: 'Sector',   
        attributes: ['nombre']
      }]
    });

    const listaSectores = await Sector.findAll();

    const habitaciones = listaHab.map(h => ({
      id: h.id,
      numero: h.numero,
      estado: h.estado,
      camas: h.camas,
      tipo: h.tipo,
      sector: h.Sector ? h.Sector.nombre : 'Sin sector'
    }));

    return res.render('habitaciones', {
      title: 'Gestión de Habitaciones',
      habitaciones,
      sectores: listaSectores
    });
  } catch (err) {
    next(err);
  }
});

router.post('/habitaciones/crear', requireAuth, habitacionController.crearHabitacionEP);


module.exports = router;
