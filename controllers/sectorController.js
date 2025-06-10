const { Sector } = require('../models');

async function obtenerSectores(req, res) {
  const sectores = await Sector.findAll({ attributes: ['id', 'nombre'] });
  res.json(sectores);
}

module.exports = { obtenerSectores };
