const { Paciente, ObraSocial } = require('../models');
const { Op } = require('sequelize');

async function buscarPorDniParcial(search = '') {
  return await Paciente.findAll({
    where: {
      dni: {
        [Op.like]: `%${search}%`
      }
    },
    limit: 10
  });
}

async function buscarPaciente(query) {
  return await Paciente.findAll({
    where: {
      dni: {
        [Op.eq]: query
      }
    },
    include: [
      {
        model: ObraSocial,
        as: 'obraSocial',
        attributes: ['id', 'nombre']
      }
    ]
  });
}


module.exports = {
  buscarPorDniParcial,
  buscarPaciente
};
