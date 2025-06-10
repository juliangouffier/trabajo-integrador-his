const { crearHabitacion, obtenerHabitacionesConCamas } = require('../services/habitacionService');
const { items, quickAccess } = require('./homeController');
const { obtenerTodosLosSectores } = require('../services/sectorService');

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

module.exports = { crearHabitacionEP };
