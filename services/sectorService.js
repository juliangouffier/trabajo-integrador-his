const { Sector } = require('../models');

async function obtenerTodosLosSectores() {
  return await Sector.findAll();
}

module.exports = {obtenerTodosLosSectores}
