const { ObraSocial, Cama, Habitacion, Admision, Paciente } = require('../models');

async function obtenerObrasSociales() {
  return await ObraSocial.findAll({ attributes: ['id', 'nombre'] });
}

async function obtenerCamasDisponiblesConContexto() {
  const camasLibres = await Cama.findAll({
    where: { estado: 'LIBRE' },
    include: [
      {
        model: Habitacion,
        include: [
          {
            model: Cama,
            where: { estado: 'OCUPADA' },
            required: false,
            include: [
              {
                model: Admision,
                where: { estado: 'ACTIVA' },
                required: false,
                include: [
                  {
                    model: Paciente,
                    attributes: ['sexo']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  return camasLibres.map(cama => {
    const habitacion = cama.Habitacion;
    const camasOcupadas = habitacion?.Camas?.filter(c => c.id !== cama.id && c.estado === 'OCUPADA');
    const generoOcupante = camasOcupadas?.[0]?.Admisions?.[0]?.Paciente?.sexo || null;

    return {
      id: cama.id,
      numero: cama.numero,
      habitacion: habitacion.numero,
      generoCompanero: generoOcupante
    };
  });
}

module.exports = {
  obtenerObrasSociales,
  obtenerCamasDisponiblesConContexto
};
