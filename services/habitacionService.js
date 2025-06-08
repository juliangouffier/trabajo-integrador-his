const { Habitacion, Sector, Cama, Admision, Paciente } = require('../models');

async function obtenerHabitacionesConCamas() {
  const habitaciones = await Habitacion.findAll({
  include: [
    {
      model: Sector,
      attributes: ['nombre']
    },
    {
      model: Cama,
      include: [
        {
          model: Admision,
          as: 'admisiones',
          where: { estado: 'ACTIVA' },
          required: false,
          include: [{ model: Paciente, attributes: ['nombre', 'sexo'] }]
        }
      ]
    }
  ]
});

return habitaciones.map(h => ({
  numero: h.numero,
  sector: h.Sector.nombre,
  camas: h.Camas.map(c => ({
    numero: c.numero,
    estado: c.estado,
    genero: c.admisiones?.[0]?.Paciente?.sexo || '',
    paciente: c.admisiones?.[0]?.Paciente?.nombre || null
  }))
}));
}

module.exports = { obtenerHabitacionesConCamas };
