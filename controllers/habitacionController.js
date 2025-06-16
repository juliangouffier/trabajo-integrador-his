const { Habitacion, Sector } = require('../models');
const { crearHabitacion, obtenerHabitacionesConCamas } = require('../services/habitacionService');
const { items, quickAccess } = require('./homeController');
const { obtenerTodosLosSectores } = require('../services/sectorService');

async function vistaHabitaciones(req, res, next) {
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

    res.render('habitaciones', {
      title: 'Gestión de Habitaciones',
      habitaciones,
      sectores: listaSectores
    });
  } catch (err) {
    next(err);
  }
}

async function crearHabitacionEP(req, res, next) {
  try {
    const { numero, sector_id, cantidad_camas } = req.body;
    const camas = [];

    for (let i = 1; i <= parseInt(cantidad_camas); i++) {
      const val = req.body[`numero_cama_${i}`];
      if (!val) throw new Error(`Número de cama ${i} no provisto`);
      camas.push(val);
    }

    await crearHabitacion({ numero, sector_id, camas });
    res.redirect('/home');
  } catch (err) {
    console.error('Error al crear habitación:', err.message);
    res.render('home', {
      errorGlobal: err.message,
      errorCrearHabitacion: err.message,
      habitaciones: await obtenerHabitacionesConCamas(),
      items,
      formHabitacion: req.body,
      quickAccess,
      abrirModalHabitacion: true,
      sectores: await obtenerTodosLosSectores()
    });
  }
}

module.exports = {
  vistaHabitaciones,
  crearHabitacionEP
};
