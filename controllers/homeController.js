const { obtenerHabitacionesConCamas } = require('../services/habitacionService');
const { obtenerTodosLosSectores } = require('../services/sectorService');

const quickAccess = [
  { title: 'Pacientes', link: '/pacientes', icon: 'bi bi-people' },
  { title: 'Citas', link: '/citas', icon: 'bi bi-calendar2-week' },
  { title: 'Reportes', link: '/reportes', icon: 'bi bi-bar-chart' }
];

const items = [
  { title: 'Nueva Admision', desc: 'Registrar ingreso de pacientes.', link: '/admisiones', icon: 'bi bi-hospital' },
  { title: 'Historia Clinica', desc: 'Gestionar internaciones.', link: '#', icon: 'bi bi-door-open' },
  { title: 'Evaluación de Enfermería', desc: 'Registrar evaluaciones iniciales.', link: '#', icon: 'bi bi-clipboard-heart' }
];

async function renderHome(req, res) {
  try {
    const habitaciones = await obtenerHabitacionesConCamas();
    
    res.render('home', {
      title: 'Sistema de Información Hospitalaria',
      items,
      quickAccess,
      habitaciones,
      sectores: await obtenerTodosLosSectores()
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno');
  }
}

module.exports = { renderHome, items, quickAccess };
