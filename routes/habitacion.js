const express = require('express');
const router = express.Router();
const { Habitacion, Sector } = require('../models');
const requireAuth = require('../middleware/authMiddleware');

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

router.post('/crear', requireAuth, async (req, res, next) => {
  try {
    const { numero, estado, camas, tipo, sector_id } = req.body;
    const sector = await Sector.findByPk(sector_id);
    if (!sector) {
      const [listaHab, listaSectores] = await Promise.all([
        Habitacion.findAll({
          include: [{ model: Sector, attributes: ['nombre'] }]
        }),
        Sector.findAll()
      ]);

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
        error: 'Sector inválido',
        habitaciones,
        sectores: listaSectores
      });
    }

    await Habitacion.create({ numero, estado, camas, tipo, sector_id });

    return res.redirect('/habitaciones');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
