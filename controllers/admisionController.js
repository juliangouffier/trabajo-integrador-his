const { obtenerObrasSociales, obtenerCamasDisponiblesConContexto, crearAdmision } = require('../services/admisionService');

async function renderFormularioAdmision(req, res, next) {
  try {
    const obrasSociales = await obtenerObrasSociales();
    const camasDisponibles = await obtenerCamasDisponiblesConContexto();
    
    res.render('admisiones', {
      title: 'Admisión de Pacientes',
      obrasSociales,
      camasDisponibles
    });
  } catch (err) {
    next(err);
  }
}

async function crearAdmisionEP(req, res, next) {
  try {
    const admisionData = {
      pacienteId: req.body.pacienteId,
      paciente: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni || null,
        sexo: req.body.genero,
        fecha_nacimiento: req.body.fechaNacimiento,
        telefono: req.body.telefono,
        email: req.body.email,
        obra_social_id: req.body.obraSocial || null,
        contacto_emergencia: req.body.contactoEmergencia || null,
        direccion: req.body.direccion
      },
      admision: {
        fecha_ingreso: req.body.fechaIngreso,
        motivo: req.body.motivo,
        cama_id: parseInt(req.body.cama, 10) || null,
        tipo_ingreso: req.body.tipo_ingreso
      }
    };

    await crearAdmision(admisionData);

    res.redirect('/home');
  } catch (err) {
    console.error('Error al crear admisión:', err);
    const obrasSociales = await obtenerObrasSociales();
    const camasDisponibles = await obtenerCamasDisponiblesConContexto();

    res.render('admisiones', {
      title: 'Admisión de Pacientes',
      obrasSociales,
      camasDisponibles,
      error: err.message,
      formData: req.body
    });
  }
}

module.exports = { renderFormularioAdmision, crearAdmisionEP };
