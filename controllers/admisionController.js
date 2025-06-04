const { obtenerObrasSociales, obtenerCamasDisponiblesConContexto } = require('../services/admisionService');

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

module.exports = { renderFormularioAdmision };
