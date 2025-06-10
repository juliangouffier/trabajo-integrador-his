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

async function crearHabitacion({ numero, sector_id, camas }) {
  const sector = await Sector.findByPk(sector_id);
  if (!sector) throw new Error('Sector no encontrado');

  const existe = await Habitacion.findOne({
    where: { numero, sector_id }
  });
  if (existe) throw new Error('Ya existe una habitación con ese número en el sector seleccionado');

  const habitacion = await Habitacion.create({ numero, sector_id });
  
  for (const numeroCama of camas) {
    await Cama.create({
      numero: numeroCama,
      estado: 'LIBRE',
      habitacion_id: habitacion.id
    });
  }

  return habitacion;
}
module.exports = { obtenerHabitacionesConCamas, crearHabitacion  };
