const { ObraSocial, Cama, Habitacion, Admision, Paciente } = require('../models');
const { Op } = require('sequelize');

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

async function crearAdmision({ pacienteId, paciente, admision }) {
  console.log("CREANDO ADMISION");
  if(admision.llegada_emergencia){
    if (admision.llegada_emergencia && !paciente.dni) {
        paciente = {
          nombre: 'Paciente de Emergencia',
          apellido: 'Sin Datos',
          dni: `EMERG-${Date.now()}`, 
          sexo: 'E',
          fecha_nacimiento: new Date(0),
          contacto: '',
          contactoEmergencia: '',
          direccion: '',
          email: '',
          telefono: '',
          notas: 'Paciente ingresado por emergencia. Datos incompletos.'
        };
    }
  }
  console.log(paciente)
  if (!paciente) throw new Error('Datos del paciente no provistos');
  validarCamposObligatoriosPaciente(paciente, admision.llegada_emergencia);

  let pacienteDbId = pacienteId;

  if (!pacienteDbId && paciente.dni) {
    const pacienteExistente = await Paciente.findOne({ where: { dni: paciente.dni } });

    if (pacienteExistente) {
      pacienteDbId = pacienteExistente.id;
    } else {
      const nuevoPaciente = await Paciente.create(paciente);
      pacienteDbId = nuevoPaciente.id;
    }
  }

  const admisionActiva = await Admision.findOne({
    where: {
      paciente_id: pacienteDbId,
      estado: 'ACTIVA'
    }
  });
  if (admisionActiva) {
    throw new Error('Este paciente ya se encuentra internado con una admisión activa.');
  }

  const camaSeleccionada = await Cama.findByPk(admision.cama_id);
  if (!camaSeleccionada) throw new Error('Cama no encontrada');

  const camasHabitacion = await Cama.findAll({
    where: {
      habitacion_id: camaSeleccionada.habitacion_id,
      id: { [Op.ne]: camaSeleccionada.id },
      estado: 'OCUPADA'
    },
    include: [{
      model: Admision,
      as: 'admisiones',
      where: { estado: 'ACTIVA' },
      include: [{ model: Paciente, attributes: ['sexo'] }]
    }]
  });

  for (const cama of camasHabitacion) {
    for (const adm of cama.admisiones) {
      const sexoCompañero = adm.Paciente.sexo;
      if (sexoCompañero !== paciente.sexo) {
        throw new Error('La cama está en una habitación compartida con un paciente de distinto sexo.');
      }
    }
  }

  const nuevaAdmision = await Admision.create({
    ...admision,
    paciente_id: pacienteDbId
  });

  return nuevaAdmision;
}

function validarCamposObligatoriosPaciente(paciente, emergencia) {
  let camposObligatorios = [];
  if(emergencia){
    camposObligatorios = [];
  } else {
    camposObligatorios = [
      'dni', 'nombre', 'apellido', 'sexo',
      'fecha_nacimiento', 'direccion', 'email', 'telefono'
    ];
  }


  const faltantes = camposObligatorios.filter(campo => !paciente[campo]);
  if (faltantes.length > 0) {
    throw new Error(`Faltan campos obligatorios del paciente: ${faltantes.join(', ')}`);
  }
}

module.exports = {
  obtenerObrasSociales,
  obtenerCamasDisponiblesConContexto,
  crearAdmision
};
