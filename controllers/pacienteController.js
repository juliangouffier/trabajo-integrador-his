const pacienteService = require('../services/pacienteService');

async function predictDni(req, res) {
  try {
    const search = req.query.search || '';
    const pacientes = await pacienteService.buscarPorDniParcial(search);
    res.json(pacientes);
  } catch (err) {
    console.error('Error en búsqueda predictiva:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function buscar(req, res) {
  const q = req.query.q || '';
  try {
    const pacientes = await pacienteService.buscarPaciente(q);
    res.json(pacientes);
  } catch (err) {
    console.error('Error al buscar paciente:', err);
    res.status(500).json({ error: 'Error interno' });
  }
}

module.exports = {
  predictDni,
  buscar
};
