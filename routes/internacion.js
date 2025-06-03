const express = require('express');
const router = express.Router();
const { Cama, Habitacion, Sector, Admision, Paciente } = require('../models');
const requireAuth = require('../middleware/authMiddleware');

router.get('/internaciones', requireAuth, async (req, res, next) => {
  try {
    const camas = await Cama.findAll({
      include: [
        {
          model: Habitacion,
          include: [Sector]
        },
        {
          model: Admision,
          where: { estado: 'ACTIVA' },
          required: false,
          include: [Paciente]
        }
      ]
    });

    const camasData = camas.map(c => ({
      id: c.id,
      numero: c.numero,
      estado: c.estado,
      habitacion: c.Habitacion?.numero || 'Sin habitación',
      sector: c.Habitacion?.Sector?.nombre || 'Sin sector',
      paciente: c.Admisions?.[0]?.Paciente || null
    }));

    res.render('internacion', {
      title: 'Administración de Internaciones',
      camas: camasData
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
