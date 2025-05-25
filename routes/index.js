var express = require('express');
var router = express.Router();

const requireAuth = require('../middleware/authMiddleware');
const habitaciones = [
  { id: 1, numero: '101', estado: 'Disponible', camas: 2, tipo: 'Individual' },
  { id: 2, numero: '102', estado: 'Ocupada', camas: 2, tipo: 'Doble' },
  { id: 3, numero: '103', estado: 'Mantenimiento', camas: 1, tipo: 'Individual' }
];

const quickAccess = [
  { title: 'Pacientes', link: '/pacientes', icon: 'bi bi-people' },
  { title: 'Citas', link: '/citas', icon: 'bi bi-calendar2-week' },
  { title: 'Reportes', link: '/reportes', icon: 'bi bi-bar-chart' },
  { title: 'Configuración', link: '/configuracion', icon: 'bi bi-gear' }
];

const items = [
  { title: 'Admisiones', desc: 'Registrar ingreso de pacientes.', link: '/admisiones', icon: 'bi bi-hospital' },
  { title: 'Habitaciones', desc: 'Gestionar habitaciones y camas.', link: '/habitaciones', icon: 'bi bi-door-open' },
  { title: 'Evaluación de Enfermería', desc: 'Registrar evaluaciones iniciales.', link: '/evaluacion-enfermeria', icon: 'bi bi-clipboard-heart' }
];

router.get('/home', requireAuth, (req, res) => {
  res.render('home', {
    title: 'Sistema de Información Hospitalaria',
    items,
    quickAccess
  });
});

router.get('/admisiones', function(req, res, next) {
  res.render('admisiones', { title: 'Admisión de Paciente' });
});

router.get('/admisiones/listado', function(req, res, next) {
  res.render('listado-admisiones', { title: 'Admisión de Paciente' });
});


router.post('/admisiones/registro', function(req, res, next) {
  const { nombre, edad, motivo, documento, sexo, habitacion } = req.body;

  console.log('Datos del paciente:', { nombre, edad, motivo, documento, sexo, habitacion });

  res.redirect('/admisiones');
});

router.get('/habitaciones', function(req, res, next) {
  res.render('habitaciones', { title: 'Gestión de Habitaciones', habitaciones });
});

router.post('/habitaciones/crear', function(req, res, next) {
  const { numero, estado, camas, tipo } = req.body;

  console.log('Habitación creada:', { numero, estado, camas, tipo });

  res.redirect('/habitaciones');
});

module.exports = router;
